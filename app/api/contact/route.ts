import { createHash } from "node:crypto";
import { validateContact } from "@/lib/contact";
import { site } from "@/config/site";

export const runtime = "nodejs";
const recentSenders = new Map<string, number>();
const requestWindow: number[] = [];

async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16000) {
      await reader.cancel();
      throw new Error("size");
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = [new URL(request.url).origin];
  if (site.url) allowedOrigins.push(new URL(site.url).origin);
  if (origin && !allowedOrigins.includes(origin))
    return Response.json(
      { error: "This request is not allowed." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json(
      { error: "Expected a JSON message." },
      { status: 415 },
    );
  let input: unknown;
  try {
    input = await readBody(request);
  } catch (error) {
    return Response.json(
      { error: "Invalid message body." },
      {
        status: error instanceof Error && error.message === "size" ? 413 : 400,
      },
    );
  }
  const result = validateContact(input);
  if (result.error)
    return Response.json({ error: result.error }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from)
    return Response.json(
      {
        error:
          "Email delivery is not available. Please use the direct email link.",
      },
      { status: 503 },
    );
  const data = result.data!;
  const now = Date.now();
  for (const [key, time] of recentSenders)
    if (now - time >= 60000) recentSenders.delete(key);
  while (requestWindow.length && now - requestWindow[0] >= 60000)
    requestWindow.shift();
  const sender = createHash("sha256")
    .update(data.email.toLowerCase())
    .digest("hex");
  // Bounded per-instance throttle; host-level limits are needed for distributed enforcement.
  if (recentSenders.has(sender) || requestWindow.length >= 10)
    return Response.json(
      { error: "Please wait a minute before sending another message." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  recentSenders.set(sender, now);
  requestWindow.push(now);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO_EMAIL || site.email],
        reply_to: data.email,
        subject: `Portfolio: ${data.subject}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return Response.json(
        {
          error:
            "Your message could not be delivered. Please try the direct email link.",
        },
        { status: 502 },
      );
    return Response.json({ success: true });
  } catch {
    return Response.json(
      {
        error:
          "The email service is temporarily unavailable. Please use the direct email link.",
      },
      { status: 502 },
    );
  }
}
