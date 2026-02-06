import { Link } from "react-router-dom";
import Layout from "../../Layout/layout";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="max-w-[720px] mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-block mb-6 text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          ← Back
        </Link>

        <h1 className="text-2xl font-semibold mb-2 dark:text-slate-200 text-slate-900">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Last updated: February 2025
        </p>

        <p className="leading-relaxed text-slate-600 dark:text-slate-400 mb-4">
          Welcome to Axpo Tracker. By using the app, you agree to these Terms of
          Service (&quot;Terms&quot;). If you do not agree, please do not use the
          app.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          1. Description of Service
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Axpo Tracker is a mobile and web application that helps you track
          personal expenses, manage fixed costs and investments, and split bills
          with others. The service is provided &quot;as is&quot; and we reserve
          the right to change, suspend, or discontinue features at any time.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          2. Account and Eligibility
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          You sign in using your Google account. You must be at least 13 years
          old (or the minimum age in your country to use such services) and able
          to form a binding contract. You are responsible for keeping your
          account secure and for all activity under your account.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          3. Acceptable Use
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          You agree to use the app only for lawful purposes. You must not:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
          <li>Use the app for any illegal or fraudulent activity.</li>
          <li>
            Attempt to gain unauthorized access to our systems or other
            users&apos; data.
          </li>
          <li>
            Upload malicious code or abuse the app in a way that harms others or
            the service.
          </li>
          <li>
            Scrape, copy, or resell the service or data in bulk without
            permission.
          </li>
        </ul>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          We may suspend or terminate your access if we believe you have
          violated these Terms.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          4. Not Financial or Legal Advice
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Axpo Tracker is for personal expense tracking and organization only.
          It does not provide tax, legal, or investment advice. Figures and
          summaries in the app are for informational use only. For important
          financial or legal decisions, please consult a qualified professional.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          5. Your Data and Privacy
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Your use of the app is also governed by our{" "}
          <Link
            to="/privacy-policy"
            className="text-indigo-500 dark:text-indigo-400 hover:underline"
          >
            Privacy Policy
          </Link>
          , which describes what data we collect and how we use it. By using the
          app, you consent to that processing.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          6. Intellectual Property
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          The app, its design, branding, and content (other than user-generated
          content) are owned by us or our licensors. You may not copy, modify,
          or create derivative works of the app or its branding without
          permission. You retain ownership of the data you input; you grant us
          the rights needed to operate the service (e.g. store and sync your
          data).
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          7. Disclaimers
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
          WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE
          THAT THE APP WILL BE ERROR-FREE, UNINTERRUPTED, OR SECURE. YOU USE THE
          APP AT YOUR OWN RISK.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          8. Limitation of Liability
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE (AND OUR SUPPLIERS,
          PARTNERS, AND AFFILIATES) SHALL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOSS OF
          PROFITS, DATA, OR USE, ARISING FROM OR RELATED TO YOUR USE OF THE APP.
          OUR TOTAL LIABILITY FOR ANY CLAIMS RELATED TO THE SERVICE SHALL NOT
          EXCEED THE AMOUNT YOU PAID US IN THE PAST 12 MONTHS (OR, IF NOTHING,
          ONE HUNDRED US DOLLARS).
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          9. Termination
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          You may stop using the app at any time. We may suspend or terminate
          your access if you breach these Terms or for other operational or
          legal reasons. Upon termination, your right to use the app ceases. We
          may retain or delete your data as described in our Privacy Policy.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          10. Changes to the Terms
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          We may update these Terms from time to time. We will post the new
          version at this URL and update the &quot;Last updated&quot; date. If
          changes are significant, we may notify you in the app or by email.
          Continued use after changes means you accept the updated Terms.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          11. General
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          These Terms are governed by the laws of India (or your country of
          residence if required by law). If any part of these Terms is held
          invalid, the rest remains in effect. Our failure to enforce a right
          does not waive that right.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          12. Contact
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          For questions about these Terms:
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-1">
          Email:{" "}
          <a
            href="mailto:ashishume@gmail.com"
            className="text-indigo-500 dark:text-indigo-400 hover:underline"
          >
            ashishume@gmail.com
          </a>
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Subject line: Axpo Tracker – Terms
        </p>
      </div>
    </Layout>
  );
};

export default TermsOfService;
