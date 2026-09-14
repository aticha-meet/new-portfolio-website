"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { contactLimits, createMailto, validateContact } from "@/lib/contact";
import { site } from "@/config/site";

export function ContactForm({ deliveryEnabled }: { deliveryEnabled: boolean }) {
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [draftUrl, setDraftUrl] = useState("");
  const inFlight = useRef(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const result = validateContact(Object.fromEntries(new FormData(form)));
    setError(false);
    setStatus("");
    setDraftUrl("");
    if (result.error) {
      setError(true);
      setStatus(result.error);
      return;
    }
    if (!deliveryEnabled) {
      setDraftUrl(createMailto(site.email, result.data!));
      setStatus(
        "Your draft is ready. Open it in your email app, review it, and press send there.",
      );
      return;
    }
    inFlight.current = true;
    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: AbortSignal.timeout(15000),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success)
        throw new Error(
          payload.error || "Unable to send. Please try the direct email link.",
        );
      setStatus("Thank you! Your message has been sent.");
      form.reset();
    } catch (failure) {
      setError(true);
      setStatus(
        failure instanceof Error && failure.name !== "TimeoutError"
          ? failure.message
          : "The request timed out. Please use the direct email link.",
      );
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-heading">
        <span className="small-label">SAY HELLO</span>
        <span>Good conversations start here.</span>
      </div>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Smith"
            maxLength={contactLimits.name}
            required
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@company.com"
            maxLength={contactLimits.email}
            required
          />
        </label>
      </div>
      <label>
        What’s on your mind?
        <input
          name="subject"
          placeholder="An opportunity, an idea, or just hello"
          maxLength={contactLimits.subject}
          required
        />
      </label>
      <label>
        Your message
        <textarea
          name="message"
          placeholder="Tell me a little about it…"
          minLength={10}
          maxLength={contactLimits.message}
          rows={4}
          required
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-bottom">
        <p>
          {deliveryEnabled
            ? "Your details are only used to reply to your message."
            : "Prepare a draft, then send it from your email app."}
        </p>
        <button
          className="button button-primary"
          type="submit"
          disabled={sending}
        >
          {sending
            ? "Sending…"
            : deliveryEnabled
              ? "Send message"
              : "Prepare email"}
          {sending ? (
            <LoaderCircle className="spinner" size={17} />
          ) : (
            <ArrowUpRight size={17} />
          )}
        </button>
      </div>
      <div
        className={`form-status ${error ? "is-error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {status}
        {draftUrl && (
          <a className="text-link draft-link" href={draftUrl}>
            Open email draft <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </form>
  );
}
