import { render } from "@react-email/components";
import { MagicLinkEmail } from "./magic-link";
import * as fs from "fs";

const html = await render(
  <MagicLinkEmail magicLink="{{ .ConfirmationURL }}" />
);

fs.writeFileSync("emails/magic-link.html", html);
console.log("Written to emails/magic-link.html");
