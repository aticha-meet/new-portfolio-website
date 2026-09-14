import test from "node:test";
import assert from "node:assert/strict";
import { validateContact, createMailto } from "../lib/contact.ts";

const message = {
  name: "Alex Smith",
  email: "alex@example.com",
  subject: "A project idea",
  message: "I would like to discuss a software project.",
};

test("rejects malformed, missing, and oversized fields", () => {
  for (const input of [
    null,
    [],
    {},
    { ...message, email: "bad@email" },
    { ...message, message: "short" },
    { ...message, name: " " },
    { ...message, name: "a".repeat(81) },
    { ...message, message: "a".repeat(3001) },
    { ...message, subject: "Hello\r\nBCC: someone@example.com" },
  ])
    assert.ok(validateContact(input).error);
});

test("rejects bot honeypot submissions", () => {
  assert.ok(validateContact({ ...message, website: "spam.example" }).error);
});

test("trims valid input and retains Unicode", () => {
  const result = validateContact({
    ...message,
    name: "  สวัสดี  ",
    website: "",
  });
  assert.equal(result.data.name, "สวัสดี");
  assert.equal(result.error, undefined);
});

test("email draft encodes special characters without adding headers", () => {
  const url = new URL(
    createMailto("owner@example.com", {
      ...message,
      subject: "Hello & question?",
      message: "ไทย & test\nA second line",
    }),
  );
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.searchParams.get("subject"), "Hello & question?");
  assert.match(url.searchParams.get("body"), /ไทย & test\nA second line/);
  assert.equal([...url.searchParams.keys()].length, 2);
});
