import { Link } from "react-router-dom";
import Layout from "../../Layout/layout";

const PrivacyPolicy = () => {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Last updated: February 2025
        </p>

        <p className="leading-relaxed text-slate-600 dark:text-slate-400 mb-4">
          Axpo Tracker (&quot;we&quot;, &quot;our&quot;, or &quot;the app&quot;)
          is an expense-tracking and bill-splitting app. This Privacy Policy
          explains what data we collect, how we use it, and your choices.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          1. Data We Collect
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          We collect the following information:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
          <li>
            <strong className="dark:text-slate-300 text-slate-700">
              Account information:
            </strong>{" "}
            When you sign in with Google, we receive your email address, display
            name, and profile photo from Google. We use this to identify you and
            display your profile in the app.
          </li>
          <li>
            <strong className="dark:text-slate-300 text-slate-700">
              Expense and financial data:
            </strong>{" "}
            Amounts, categories, descriptions, dates, and notes you enter for
            expenses; fixed costs, investments, salary, and group/split data.
            This is stored to provide tracking, charts, and bill-splitting.
          </li>
          <li>
            <strong className="dark:text-slate-300 text-slate-700">
              Group and split data:
            </strong>{" "}
            Names and email addresses of members you add to groups, and expense
            splits, for the purpose of splitting bills.
          </li>
          <li>
            <strong className="dark:text-slate-300 text-slate-700">
              Device/local data:
            </strong>{" "}
            We use local storage (e.g. on your device) to keep you signed in and
            to cache data for offline use.
          </li>
        </ul>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          2. How We Collect Data
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
          <li>
            Directly from you when you sign in (via Google) and when you add
            expenses, groups, or members.
          </li>
          <li>
            Optional CSV import: if you use the import feature, file contents are
            processed only on your device and then stored in your account as
            described above.
          </li>
        </ul>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          3. Purpose of Use
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          We use this data to:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
          <li>Provide expense tracking, summaries, and visualizations.</li>
          <li>Enable bill splitting and group expense management.</li>
          <li>Keep your data in sync across devices when you are signed in.</li>
          <li>
            Keep you signed in and improve app performance (e.g. caching).
          </li>
        </ul>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          4. Storage and Processing
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          Your data is stored and processed using:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
          <li>
            <strong className="dark:text-slate-300 text-slate-700">
              Supabase
            </strong>{" "}
            – to store your account-linked data (expenses, groups, etc.) in a
            secure cloud database.
          </li>
          <li>
            <strong className="dark:text-slate-300 text-slate-700">Google</strong>{" "}
            – only for sign-in (OAuth). We do not control Google&apos;s own
            privacy practices; please refer to Google&apos;s Privacy Policy.
          </li>
        </ul>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Data is transmitted over HTTPS. Supabase provides encryption in transit
          and at rest as part of their service.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          5. Sharing and Disclosure
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          We do not sell your personal data. We may share or disclose data
          only:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
          <li>
            With service providers (e.g. Supabase) that help us run the app,
            under strict confidentiality and data-processing terms.
          </li>
          <li>
            If required by law or to protect our rights, safety, or property.
          </li>
          <li>
            Within a group: other members in a bill-split group can see that
            group&apos;s expenses and splits, as intended by the feature.
          </li>
        </ul>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          6. Data Retention
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          We retain your data for as long as your account exists and you use the
          app. If you want your data deleted, contact us (see below). After
          account/data deletion, we will remove or anonymize your data within a
          reasonable period, except where we must keep it for legal reasons.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          7. Your Rights and Choices
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
          <li>
            You can stop using the app and request account and data deletion by
            contacting us.
          </li>
          <li>
            You can revoke the app&apos;s access to your Google account from
            your Google account settings.
          </li>
          <li>
            If you are in the European Economic Area or other regions with
            similar laws, you may have additional rights (access, correction,
            deletion, portability, objection). Contact us to exercise them.
          </li>
        </ul>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          8. Children
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Axpo Tracker is not directed at children under 13. We do not knowingly
          collect data from children under 13. If you believe we have done so,
          please contact us so we can delete it.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          9. Changes to This Policy
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          We may update this Privacy Policy from time to time. We will post the
          updated version at this URL and update the &quot;Last updated&quot;
          date. Continued use of the app after changes means you accept the
          updated policy.
        </p>

        <h2 className="text-lg font-medium mt-8 mb-2 dark:text-slate-200 text-slate-900">
          10. Contact
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          For privacy-related requests, data deletion, or questions:
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
          Subject line: Axpo Tracker – Privacy
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
