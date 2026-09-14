export const contactLimits = {
  name: 80,
  email: 254,
  subject: 120,
  message: 3000,
} as const;
export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

export function validateContact(
  input: unknown,
): { data: ContactMessage; error?: never } | { error: string; data?: never } {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { error: "Please complete all fields." };
  const value = input as Record<string, unknown>;
  if (value.website) return { error: "Unable to submit this message." };
  for (const [key, limit] of Object.entries(contactLimits)) {
    if (
      typeof value[key] !== "string" ||
      !(value[key] as string).trim() ||
      (value[key] as string).length > limit
    )
      return {
        error: `Please enter a valid ${key} (up to ${limit} characters).`,
      };
  }
  const data = Object.fromEntries(
    Object.keys(contactLimits).map((key) => [
      key,
      (value[key] as string).trim(),
    ]),
  ) as ContactMessage;
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
    /[\r\n]/.test(data.name + data.subject)
  )
    return { error: "Please check your name, email, and subject." };
  if (data.message.length < 10)
    return { error: "Please write a message of at least 10 characters." };
  return { data };
}

export function createMailto(recipient: string, data: ContactMessage) {
  const body = `${data.message}\n\nFrom: ${data.name}\nReply to: ${data.email}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
}
