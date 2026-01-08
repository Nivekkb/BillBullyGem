import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
       <Link href="/" className="inline-flex items-center text-primary mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      <div className="prose prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <p className="border-l-4 border-primary pl-4 text-lg">
          <strong>Important:</strong> This Privacy Policy is a starting point and should be reviewed by a qualified legal professional.
        </p>

        <h2>1. Overview</h2>
        <p>
          This Privacy Policy explains how BillBully ("we," "us," or "our") collects, uses, and shares information when you use
          our website and services (the "Service").
        </p>

        <h2>2. Information We Collect</h2>
        <ul>
          <li><strong>Account data:</strong> name, email address, and authentication data.</li>
          <li><strong>Service inputs:</strong> bills, subscriptions, credit items, and other details you provide to generate scripts or letters.</li>
          <li><strong>Usage data:</strong> device information, log data, and basic analytics about how you use the Service.</li>
          <li><strong>Payment data:</strong> handled by our payment processor (e.g., Stripe). We do not store full payment card details.</li>
        </ul>

        <h2>3. How We Use Information</h2>
        <ul>
          <li>Provide and improve the Service and customer support.</li>
          <li>Generate AI-assisted documents and workflows you request.</li>
          <li>Process subscriptions and transactions.</li>
          <li>Send service communications and updates.</li>
          <li>Maintain safety, security, and prevent fraud.</li>
        </ul>

        <h2>4. How We Share Information</h2>
        <p>
          We do not sell your personal information. We may share information with trusted service providers who help us operate
          the Service (e.g., hosting, analytics, payment processing). These providers are required to protect your information
          and use it only for our purposes.
        </p>

        <h2>5. Data Retention</h2>
        <p>
          We retain information for as long as needed to provide the Service and comply with legal obligations. You can request
          deletion of your account data subject to applicable law.
        </p>

        <h2>6. Security</h2>
        <p>
          We use reasonable administrative, technical, and physical safeguards to protect your information. No method of transmission
          or storage is completely secure.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, delete, or object to processing of your personal data.
          Contact us to exercise these rights.
        </p>

        <h2>8. International Users</h2>
        <p>
          If you access the Service from outside Province of Ontario, Canada, your information may be processed in jurisdictions where data
          protection laws may differ.
        </p>
        <p>
          We comply with applicable Canadian privacy requirements, including PIPEDA, and relevant Ontario consumer protection laws.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the updated policy on this page with a revised date.
        </p>

        <h2>10. Contact</h2>
        <p>
          Questions about this Privacy Policy? Contact us at Kevin@SerenixDigital.com.
        </p>
      </div>
    </div>
  );
}
