import {
  EMAIL_PATTERN,
  HONEYPOT_FIELD_NAME,
  MAX_EMAIL_LENGTH,
  MIN_SUBMIT_MS,
} from "@/lib/waitlist/constants";

// Adds a waitlist signup to Brevo. Runs on the server (a Vercel function), so
// BREVO_API_KEY never reaches the browser.
//
// Env:
//   BREVO_API_KEY  required. Brevo > SMTP & API > API keys.
//   BREVO_LIST_ID  optional. Numeric id of the list to add contacts to
//                  (comma-separate several). Without it, contacts land in
//                  Brevo's contacts with no list.

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isLikelyBot = (body: Record<string, unknown>): boolean => {
  const honeypot = body[HONEYPOT_FIELD_NAME];
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;

  const { startedAt } = body;
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) return true;

  return Date.now() - startedAt < MIN_SUBMIT_MS;
};

const parseListIds = (raw: string | undefined): number[] | undefined => {
  if (!raw) return undefined;
  const ids = raw
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((id) => Number.isInteger(id) && id > 0);
  return ids.length > 0 ? ids : undefined;
};

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("Waitlist: BREVO_API_KEY is not set.");
    return Response.json({ error: "The waitlist isn't available right now." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!isRecord(body)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots get a success so they don't retry, but nothing is saved.
  if (isLikelyBot(body)) {
    return Response.json({ success: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }

  const listIds = parseListIds(process.env.BREVO_LIST_ID);

  try {
    const response = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      // updateEnabled: signing up twice updates the contact instead of erroring.
      body: JSON.stringify({ email, updateEnabled: true, ...(listIds ? { listIds } : {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      // Brevo's message stays in the server logs, not in the visitor's browser.
      console.error(`Waitlist: Brevo responded ${response.status}: ${await response.text()}`);
      return Response.json({ error: "We couldn't add you right now." }, { status: 502 });
    }
  } catch (error) {
    console.error("Waitlist: could not reach Brevo.", error);
    return Response.json({ error: "We couldn't add you right now." }, { status: 502 });
  }

  return Response.json({ success: true });
}
