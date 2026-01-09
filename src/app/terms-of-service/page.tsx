import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
       <Link href="/" className="inline-flex items-center text-primary mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      <div className="prose prose-invert max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using BillBully (the "Service"), you agree to be bound by these Terms of Service ("Terms").
          If you do not agree, do not use the Service.
        </p>

        <h2>2. The Service</h2>
        <p>
          BillBully provides tools and AI-assisted content such as scripts, templates, and letters to help users manage
          personal financial tasks including bill negotiation and credit report disputes. The Service is for informational
          and organizational purposes only. We do not provide legal, financial, or credit repair advice. You are responsible
          for how you use any outputs.
        </p>

        <h2>3. Eligibility and Accounts</h2>
        <p>
          You must be at least 18 years old to use the Service. You are responsible for maintaining the confidentiality
          of your account credentials and for all activity under your account. Notify us immediately of any unauthorized use.
        </p>

        <h2>4. User Content</h2>
        <p>
          You retain ownership of the content you submit to the Service ("User Content"). You grant us a limited, worldwide,
          non-exclusive license to use, host, store, process, and display User Content solely to provide and improve the Service.
        </p>

        <h2>5. Subscriptions and Payments</h2>
        <p>
          Paid plans are billed in advance and renew automatically until canceled. Payment processing is handled by a third-party
          provider (e.g., Stripe). Unless required by law, fees are non-refundable. You can cancel at any time to stop future billing.
        </p>

        <h2>6. Prohibited Use</h2>
        <p>
          You agree not to misuse the Service, including attempting to access it using automated means, reverse engineering,
          interfering with security features, or submitting unlawful, fraudulent, or abusive content.
        </p>

        <h2>7. Availability and Changes</h2>
        <p>
          We may modify, suspend, or discontinue any part of the Service at any time. We may also update these Terms and will
          post changes on this page. Continued use after changes constitutes acceptance.
        </p>

        <h2>8. Disclaimers</h2>
        <p>
          The Service is provided "as is" and "as available" without warranties of any kind. We do not guarantee outcomes,
          savings, credit score changes, or dispute results. Your results may vary based on your circumstances and actions.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, BillBully and its affiliates will not be liable for any indirect, incidental,
          special, consequential, or punitive damages, or any loss of profits or revenues.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of Province of Ontario, Canada, without regard to conflict of law rules.
        </p>
        <p>
          Where applicable, this includes Ontario statutes such as the Consumer Protection Act, 2002.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about these Terms? Contact us at Kevin@SerenixDigital.com.
        </p>
      </div>
    </div>
  );
}
