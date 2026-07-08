import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | BIODROPS Packaged Drinking Water",
  description: "Official privacy policy for BIODROPS. Read about our data collection, analytics, cookie policies, data security, and user rights.",
  alternates: {
    canonical: "https://biodropsindia.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | BIODROPS Packaged Drinking Water",
    description: "Official privacy policy for BIODROPS. Read about our data collection, analytics, cookie policies, data security, and user rights.",
    url: "https://biodropsindia.com/privacy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | BIODROPS Packaged Drinking Water",
    description: "Official privacy policy for BIODROPS. Read about our data collection, analytics, cookie policies, data security, and user rights.",
  }
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#56C7D9] selection:text-white pt-32">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://biodropsindia.com/privacy/#webpage",
                "url": "https://biodropsindia.com/privacy",
                "name": "Privacy Policy | BIODROPS Packaged Drinking Water",
                "description": "Official privacy policy for BIODROPS. Read about our data collection, analytics, cookie policies, data security, and user rights.",
                "isPartOf": {
                  "@id": "https://biodropsindia.com/#website"
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://biodropsindia.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Privacy Policy",
                      "item": "https://biodropsindia.com/privacy"
                    }
                  ]
                }
              }
            ]
          })
        }}
      />

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        {/* Breadcrumb Visual Component */}
        <nav className="flex gap-2 text-xs tracking-wider uppercase text-[#6B7C80] font-medium mb-6">
          <Link href="/" className="hover:text-[#56C7D9] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#070D0E]/80">Privacy Policy</span>
        </nav>

        <div className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-[#6B7C80] font-medium mb-6">
          <span className="w-12 h-px bg-[#6B7C80]/30" />
          Transparency & Trust
        </div>
        
        <h1 className="text-4xl md:text-6xl font-serif text-[#070D0E] mb-8 leading-tight">
          Privacy <span className="italic text-[#56C7D9]">Policy.</span>
        </h1>

        <div className="text-xs text-[#6B7C80] mb-12 border-b border-black/10 pb-4">
          Last Updated: July 9, 2026
        </div>

        <article className="prose prose-lg prose-gray max-w-none text-[#070D0E]/80 space-y-8 leading-relaxed">
          {/* Section 1: Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">1. Introduction</h2>
            <p>
              Welcome to <strong>BIODROPS</strong> (https://biodropsindia.com). We are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy details how we collect, process, utilize, and protect your information when you visit our website, interact with our services, or place orders for our premium packaged drinking water.
            </p>
            <p>
              BIODROPS is a packaged drinking water initiative launched and managed by <strong>Biofix Technology LLP</strong>. By accessing our website or using our services, you consent to the data collection and processing methods outlined in this policy.
            </p>
          </section>

          {/* Section 2: Information Collected */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">2. Information We Collect</h2>
            <p>
              We collect information to provide high-quality water delivery and verification services. The types of data we gather include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Identification Details:</strong> Name, contact numbers (including mobile number for OTP check and WhatsApp notifications), billing address, and delivery coordinates when you sign up or contact us.</li>
              <li><strong>Device & Interaction Data:</strong> IP addresses, browser specifications, page view metrics, timestamps, and referring pages.</li>
              <li><strong>Verification Records:</strong> Any batch number searches or scan activities entered on our website for quality tracking purposes.</li>
            </ul>
          </section>

          {/* Section 3: Website Analytics */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">3. Website Analytics</h2>
            <p>
              To continuously optimize our web speed, structure, and user experience, we employ server-side analytics tools. These services collect anonymous aggregated interaction metrics. This analytical data cannot be used to personally identify individuals and is stored solely to improve site performance and search responsiveness.
            </p>
          </section>

          {/* Section 4: Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">4. Cookies</h2>
            <p>
              We use cookie files to manage active sessions, authenticate users, and remember selection configurations. You have complete control over cookies through your web browser preferences. For detailed information on our cookie structures, categories, and instructions on how to disable them, please consult our dedicated <Link href="/cookies" className="text-[#56C7D9] hover:underline font-semibold">Cookie Policy</Link>.
            </p>
          </section>

          {/* Section 5: Contact Forms & Email Communications */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">5. Contact Forms & Communication</h2>
            <p>
              Information submitted via our contact forms, customer verification forms, or email links is processed directly to fulfill queries or logistical dispatch. We do not sell or lease this contact details to third-party marketing organizations. Your email and phone numbers may be used to transmit order status updates, BQMS reports, or delivery alerts.
            </p>
          </section>

          {/* Section 6: Third-Party Services */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">6. Third-Party Services</h2>
            <p>
              We utilize trusted third-party services to manage secure databases, authentication processes (such as Google OAuth or NextAuth), and logistics tracking systems. These third parties are bound by confidentiality agreements and are prohibited from accessing your information for any purposes other than performing services on our behalf.
            </p>
          </section>

          {/* Section 7: Data Security */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">7. Data Security</h2>
            <p>
              Data transmission on BIODROPS is protected using Secure Sockets Layer (SSL) encryption protocol. We adopt industry-standard operational methods and database encryption to guard against unauthorized access, editing, disclosure, or destruction of consumer profiles.
            </p>
          </section>

          {/* Section 8: Data Retention */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">8. Data Retention</h2>
            <p>
              We retain personal details only for as long as necessary to satisfy the purposes defined in this Privacy Policy, including fulfilling delivery contracts, legal obligations, or resolving operational audits. Once data is no longer needed, it is deleted or anonymized securely.
            </p>
          </section>

          {/* Section 9: User Rights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">9. Your Privacy Rights</h2>
            <p>
              Depending on your regional jurisdiction, you possess the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to copies of the personal information we store about you.</li>
              <li>Request correction or modification of inaccurate details.</li>
              <li>Request deletion of your data, subject to local regulatory compliance.</li>
              <li>Opt-out of promotional communications or system updates.</li>
            </ul>
            <p>
              To exercise these rights, please contact our support department at <a href="mailto:hello@biodrops.com" className="text-[#56C7D9] hover:underline font-semibold">hello@biodrops.com</a>.
            </p>
          </section>

          {/* Section 10: Policy Updates */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">10. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our operational procedures, safety guidelines, or legal mandates. We encourage users to inspect this page frequently to stay informed about how we safeguard their data.
            </p>
          </section>

          {/* Section 11: Contact Information */}
          <section className="space-y-4 pt-6 border-t border-black/10">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">11. Contact Details</h2>
            <p>
              For concerns, questions, or clarification regarding this Privacy Policy, write or call:
            </p>
            <p className="text-sm bg-black/5 p-4 rounded-xl leading-relaxed">
              <strong>BIODROPS Support</strong><br />
              Biofix Technology LLP,<br />
              MC Building, Bypass Road,<br />
              Kondotty, Kerala, India - 673638<br />
              Email: <a href="mailto:hello@biodrops.com" className="text-[#56C7D9] hover:underline">hello@biodrops.com</a><br />
              Phone: +91 88845 77773
            </p>
          </section>
        </article>
      </div>
      <Footer />
    </main>
  );
}
