import type { Metadata } from "next";
import LegalDocument from "../_components/LegalDocument";
import LegalSection from "../_components/LegalSection";
import { CONTACT_EMAIL, EFFECTIVE_DATE } from "../constants/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | SnackBunny",
  description: "How SnackBunny collects, uses and protects your information.",
};

const EmailLink = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      effectiveDate={EFFECTIVE_DATE}
      lede={
        <>
          SnackBunny (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, and safeguard your information when you use the SnackBunny app and this website.
        </>
      }
    >
      <LegalSection id="information-we-collect" title="1. Information We Collect">
        <ul>
          <li>
            <strong>Account information:</strong> When you start using the app, we create an account for you without
            needing your email. If you choose to add an email address, for example to sign in on another device, we
            store it with your account.
          </li>
          <li>
            <strong>Profile information:</strong> Information you provide during setup, such as your name, your
            bunny’s name, your goal, height, weight, goal weight, date of birth, sex, and your daily targets for
            calories, sleep, water, and steps.
          </li>
          <li>
            <strong>Logs you create:</strong> Meals with calories and macros, water, sleep, mood ratings and any notes
            you add, steps, and reminders you write.
          </li>
          <li>
            <strong>Apple Health data:</strong> If you connect Apple Health, we read your sleep and step counts. See
            “Apple Health Information” below.
          </li>
          <li>
            <strong>Purchase information:</strong> Subscriptions are processed by Apple. We receive your subscription
            status through our subscription provider, RevenueCat. We never see your payment card details.
          </li>
          <li>
            <strong>Waitlist:</strong> If you join our waitlist on this website, we store the email address you give
            us.
          </li>
          <li>
            <strong>Usage data:</strong> Information about how you use the app and website, such as log data, device
            information, and aggregated page analytics.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="how-we-use" title="2. How We Use Your Information">
        <ul>
          <li>Provide and improve our services, including your dashboard, history, bunny, and reminders.</li>
          <li>Personalize your daily targets and keep your data in sync across your devices.</li>
          <li>Communicate with you about your account and, if you joined the waitlist, tell you when we launch.</li>
          <li>Analyze usage trends and improve app performance.</li>
        </ul>
        <p>We do not use your health or wellness information for advertising, and we do not sell it.</p>
      </LegalSection>

      <LegalSection id="apple-health" title="3. Apple Health Information">
        <p>
          With your permission, SnackBunny reads only two types of data from Apple Health: sleep and steps. We never
          write to Apple Health. Values we read are saved to your account so they appear in your history.
        </p>
        <ul>
          <li>We never use Apple Health data for advertising or marketing.</li>
          <li>We never sell Apple Health data or share it with third parties for their own purposes.</li>
          <li>
            You can turn off access at any time in your iPhone’s Settings, under Privacy &amp; Security, then Health.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="sharing" title="4. Sharing Your Information">
        <ul>
          <li>
            With service providers who assist in app functionality: Supabase (accounts and data storage), RevenueCat
            (subscription status), Apple (App Store purchases and notifications), and Vercel (website hosting and
            analytics). They may only use your information to provide their services to us.
          </li>
          <li>If required by law or to protect our rights.</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </LegalSection>

      <LegalSection id="security" title="5. Data Security">
        <p>
          We implement appropriate measures to protect your data from unauthorized access. However, no system is
          completely secure. You are responsible for keeping your device and the email account you sign in with
          secure.
        </p>
        <p>
          We cannot stop you from sharing your account with others. However, we will not be liable if you do decide
          to give permission to someone else to access your account.
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="6. Cookies and Tracking">
        <p>
          This website uses cookies and similar technologies only where they are needed, such as keeping you signed
          in and remembering your preferences. Our website analytics are aggregated and do not use cookies to track
          you. You can disable cookies through your browser settings, though some features may not work. The app does
          not use advertising trackers.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" title="7. Your Rights">
        <p>
          You may request access to, correction of, or deletion of your personal data by contacting us at{" "}
          <EmailLink />. You can also delete your account from Settings in the app, which permanently removes your
          account, profile, logs, and reminders.
        </p>
      </LegalSection>

      <LegalSection id="children" title="8. Children’s Privacy">
        <p>
          Our app is not intended for users under the age of 16. We do not knowingly collect information from
          children.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="9. Data Retention">
        <p>
          We retain personal information for as long as your account is active, or as long as necessary to provide
          our services and comply with legal obligations. When you delete your account, your account data is
          removed. Waitlist emails are kept until we launch or until you ask us to remove yours.
        </p>
      </LegalSection>

      <LegalSection id="california" title="10. California Privacy Rights">
        <p>
          If you are a California resident, you have the following rights under the California Consumer Privacy Act
          (CCPA) and the California Privacy Rights Act (CPRA):
        </p>
        <h3>Right to Know</h3>
        <p>You may request information about:</p>
        <ul>
          <li>The categories and specific pieces of personal information we collect.</li>
          <li>The purposes for collecting, using, or sharing personal information.</li>
          <li>The categories of third parties with whom we share personal information.</li>
        </ul>
        <h3>Right to Delete</h3>
        <p>
          You may request that we delete the personal information we have collected about you, subject to certain
          exceptions.
        </p>
        <h3>Right to Opt-Out</h3>
        <p>
          We do not sell your personal information or share it for cross-context behavioral advertising. If that ever
          changes, we will update this policy and give you a way to opt out.
        </p>
        <h3>Right to Limit Use of Sensitive Personal Information</h3>
        <p>
          We only use sensitive personal information, such as health and wellness information, to provide the
          services you ask for.
        </p>
        <h3>Right to Correct</h3>
        <p>You may request that we correct inaccurate personal information we hold about you.</p>
        <h3>Right to Non-Discrimination</h3>
        <p>We will not discriminate against you for exercising your privacy rights.</p>
        <p>
          To submit a request, please contact us at <EmailLink />.
        </p>
      </LegalSection>

      <LegalSection id="categories" title="11. Categories of Personal Information We Collect">
        <ul>
          <li>
            <strong>Identifiers:</strong> Name, email address, account ID, and IP address.
          </li>
          <li>
            <strong>Health and wellness information:</strong> Height, weight, goal weight, date of birth, sex, and your
            food, water, sleep, mood, and step logs.
          </li>
          <li>
            <strong>Commercial information:</strong> Your subscription status.
          </li>
          <li>
            <strong>Internet activity:</strong> Interactions with our website and app.
          </li>
          <li>
            <strong>Geolocation data:</strong> Approximate location based on IP address.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="updates" title="12. Updates to This Privacy Policy">
        <p>
          We may update this Privacy Policy periodically. Changes will be posted on this page with an updated
          effective date.
        </p>
        <p>
          If you have questions about this policy, contact us at <EmailLink />.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
