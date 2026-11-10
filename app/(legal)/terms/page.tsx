import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument from "../_components/LegalDocument";
import LegalSection from "../_components/LegalSection";
import { CONTACT_EMAIL, EFFECTIVE_DATE } from "../constants/legal";

export const metadata: Metadata = {
  title: "Terms of Use | SnackBunny",
  description: "The terms that apply when you use the SnackBunny app and website.",
};

const EmailLink = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Use"
      effectiveDate={EFFECTIVE_DATE}
      lede={
        <>
          These Terms of Use (“Terms”) apply when you use the SnackBunny app and this website. By using SnackBunny,
          you agree to these Terms. If you do not agree, please do not use SnackBunny.
        </>
      }
    >
      <LegalSection id="what-snackbunny-is" title="1. What SnackBunny Is (and Isn’t)">
        <p>
          SnackBunny is a self-care companion that helps you keep track of meals, water, sleep, mood, and steps. Your
          bunny reflects your habits, never your body.
        </p>
        <p>
          <strong>SnackBunny is not a medical or weight-loss tool.</strong> It does not provide medical, nutritional,
          or mental health advice, and it is not a substitute for a doctor, dietitian, or therapist. Talk to a
          qualified professional before making changes to your diet, sleep, or exercise.
        </p>
        <p>
          If food feels hard right now, the{" "}
          <a href="https://www.allianceforeatingdisorders.com" target="_blank" rel="noopener noreferrer">
            National Alliance for Eating Disorders
          </a>{" "}
          is there to help, no judgement. If you are in crisis or may be in danger, call your local emergency number
          right away.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" title="2. Eligibility">
        <p>You must be at least 16 years old to use SnackBunny.</p>
      </LegalSection>

      <LegalSection id="account" title="3. Your Account">
        <p>
          You are responsible for activity on your account and for keeping your device and the email account you sign
          in with secure. We cannot stop you from sharing your account with others, but we will not be liable if you
          decide to give someone else access to it.
        </p>
      </LegalSection>

      <LegalSection id="subscriptions" title="4. Subscriptions and Free Trials">
        <p>
          SnackBunny offers a free plan and an optional paid subscription, SnackBunny Pro. The current price and
          what Pro includes are shown in the app before you buy.
        </p>
        <ul>
          <li>Pro is purchased through the Apple App Store, and payment is charged to your Apple account.</li>
          <li>
            Your subscription renews automatically unless you cancel at least 24 hours before the end of the current
            period. Your Apple account is charged for renewal within 24 hours before the period ends.
          </li>
          <li>
            If you start a free trial, it converts to a paid subscription when the trial ends unless you cancel at
            least 24 hours before it ends.
          </li>
          <li>You can manage or cancel your subscription at any time in your Apple account settings.</li>
          <li>Refunds are handled by Apple under its policies.</li>
          <li>
            If your subscription ends, your saved data stays. Pro features, such as your custom reminders, pause until
            you subscribe again.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="your-content" title="5. Your Content">
        <p>
          The logs, notes, and reminders you create belong to you. You give us permission to store and process them
          only so we can provide SnackBunny to you. Our{" "}
          <Link href="/privacy">Privacy Policy</Link> explains how we handle your information.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" title="6. Acceptable Use">
        <p>When using SnackBunny, you agree not to:</p>
        <ul>
          <li>Use it for any unlawful purpose.</li>
          <li>Try to access other people’s accounts or data.</li>
          <li>Interfere with, disrupt, or overload the app, the website, or the systems behind them.</li>
          <li>Copy, reverse engineer, or resell SnackBunny or any part of it.</li>
        </ul>
      </LegalSection>

      <LegalSection id="our-content" title="7. Our Content">
        <p>
          SnackBunny, including its name, the bunny and its artwork, and the app’s design, belongs to us. We give you a
          personal, non-transferable license to use the app for your own non-commercial use, subject to these Terms.
        </p>
      </LegalSection>

      <LegalSection id="apple" title="8. Apple App Store Terms">
        <p>
          These Terms are between you and SnackBunny, not Apple. Apple is not responsible for the app, its content,
          maintenance, support, or any claims relating to it. If the app fails to conform to any applicable warranty,
          you may notify Apple, and Apple may refund the purchase price, if any. Apple and its subsidiaries are third
          party beneficiaries of these Terms and may enforce them against you. Your use of the app must also follow
          the Apple Media Services Terms and Conditions.
        </p>
      </LegalSection>

      <LegalSection id="disclaimers" title="9. Disclaimers">
        <p>
          SnackBunny is provided “as is” and “as available.” We do our best to keep it running smoothly and accurately,
          but we do not promise that it will always be available, error-free, or that any targets or information in the
          app are right for you.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="10. Limitation of Liability">
        <p>
          To the fullest extent allowed by law, SnackBunny will not be liable for any indirect, incidental, special,
          or consequential damages, or for any loss of data, arising from your use of the app or website. Our total
          liability for any claim is limited to the amount you paid us for SnackBunny in the 12 months before the
          claim.
        </p>
      </LegalSection>

      <LegalSection id="ending" title="11. Ending Your Use">
        <p>
          You can stop using SnackBunny at any time and delete your account from Settings in the app. We may suspend
          or end access for anyone who violates these Terms.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="12. Changes to These Terms">
        <p>
          We may update these Terms periodically. Changes will be posted on this page with an updated effective date.
          If you keep using SnackBunny after a change, you accept the updated Terms.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="13. Contact">
        <p>
          If you have questions about these Terms, contact us at <EmailLink />.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
