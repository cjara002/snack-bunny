import { HONEYPOT_FIELD_NAME } from "../waitlist/constants";

/** Body the waitlist form POSTs to /api/waitlist. */
export interface WaitlistPayload {
  email: string;
  /** Date.now() when the form first rendered, for the too-fast bot check. */
  startedAt: number;
  [HONEYPOT_FIELD_NAME]: string;
}
