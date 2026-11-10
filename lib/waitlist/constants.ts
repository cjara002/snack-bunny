// Shared by the waitlist form and /api/waitlist so both sides agree.

/** Hidden field real people never fill in. Bots that do get a fake success. */
export const HONEYPOT_FIELD_NAME = "bot-field";

/** Submissions faster than this after the form appeared are treated as bots. */
export const MIN_SUBMIT_MS = 2000;

export const MAX_EMAIL_LENGTH = 254;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const WAITLIST_ENDPOINT = "/api/waitlist";
