import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | BIODROPS Packaged Drinking Water",
  description: "Read the official Cookie Policy for BIODROPS. Learn how we use cookies, analytics, performance tags, and how to manage browser settings.",
  alternates: {
    canonical: "https://biodropsindia.com/cookies",
  },
  openGraph: {
    title: "Cookie Policy | BIODROPS Packaged Drinking Water",
    description: "Read the official Cookie Policy for BIODROPS. Learn how we use cookies, analytics, performance tags, and how to manage browser settings.",
    url: "https://biodropsindia.com/cookies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | BIODROPS Packaged Drinking Water",
    description: "Read the official Cookie Policy for BIODROPS. Learn how we use cookies, analytics, performance tags, and how to manage browser settings.",
  }
};

export default function CookiesPage() {
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
                "@id": "https://biodropsindia.com/cookies/#webpage",
                "url": "https://biodropsindia.com/cookies",
                "name": "Cookie Policy | BIODROPS Packaged Drinking Water",
                "description": "Read the official Cookie Policy for BIODROPS. Learn how we use cookies, analytics, performance tags, and how to manage browser settings.",
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
                      "name": "Cookie Policy",
                      "item": "https://biodropsindia.com/cookies"
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
          <span className="text-[#070D0E]/80">Cookie Policy</span>
        </nav>

        <div className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-[#6B7C80] font-medium mb-6">
          <span className="w-12 h-px bg-[#6B7C80]/30" />
          Settings & Preferences
        </div>
        
        <h1 className="text-4xl md:text-6xl font-serif text-[#070D0E] mb-8 leading-tight">
          Cookie <span className="italic text-[#56C7D9]">Policy.</span>
        </h1>

        <div className="text-xs text-[#6B7C80] mb-12 border-b border-black/10 pb-4">
          Last Updated: July 9, 2026
        </div>

        <article className="prose prose-lg prose-gray max-w-none text-[#070D0E]/80 space-y-8 leading-relaxed">
          {/* Section 1: Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">1. What are Cookies?</h2>
            <p>
              Cookies are small text files placed on your browser or device when you access websites. They are extensively used to ensure websites function correctly, optimize browsing speed, and provide anonymous performance metrics.
            </p>
            <p>
              At <strong>BIODROPS</strong>, we use cookies to provide stable session tokens, authenticate logins, track batch searches, and run performance analytics.
            </p>
          </section>

          {/* Section 2: Cookie Categories */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">2. How We Use Cookies</h2>
            <p>
              We classify the cookies used on our website (https://biodropsindia.com) into three primary categories:
            </p>
            
            <div className="space-y-6 mt-4">
              <div className="p-4 bg-black/5 rounded-xl border border-black/5">
                <h3 className="text-base font-bold text-[#070D0E] mb-2">A. Essential Cookies (Strictly Necessary)</h3>
                <p className="text-sm">
                  These cookies are mandatory for core website features to resolve. They enable basic route loading, user authentication tokens (NextAuth session records), and page security blocks. The website cannot compile properly without these cookies.
                </p>
              </div>

              <div className="p-4 bg-black/5 rounded-xl border border-black/5">
                <h3 className="text-base font-bold text-[#070D0E] mb-2">B. Performance & Functionality Cookies</h3>
                <p className="text-sm">
                  These cookies remember configuration choices you set on our pages (such as form fields and batch number text logs), preventing you from needing to re-enter details repeatedly.
                </p>
              </div>

              <div className="p-4 bg-black/5 rounded-xl border border-black/5">
                <h3 className="text-base font-bold text-[#070D0E] mb-2">C. Analytical Cookies</h3>
                <p className="text-sm">
                  These cookies gather aggregated, anonymous interaction stats to evaluate page load performance, visual rendering speeds, and crawl efficiency. We use this data to hit our performance optimization goals.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Third-Party Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">3. Third-Party Cookies</h2>
            <p>
              In some instances, we deploy analytical resources managed by trusted third-party providers. These external partners set cookies on our behalf to trace interaction paths. These cookies do not store any personal identification details and are audited regularly under our privacy standards.
            </p>
          </section>

          {/* Section 4: Managing Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">4. Managing & Disabling Cookies</h2>
            <p>
              You can alter, reject, or block cookie storage via your internet browser settings. If you block essential cookies, parts of our verification forms or route systems may experience functional interruptions.
            </p>
            <p>
              Instructions on how to configure cookie choices in popular browsers:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Third-party cookies.</li>
              <li><strong>Apple Safari:</strong> Settings &gt; Safari &gt; Advanced &gt; Block All Cookies.</li>
              <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy & Security &gt; Enhanced Tracking Protection.</li>
              <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions &gt; Manage and delete cookies.</li>
            </ul>
          </section>

          {/* Section 5: Policy Updates */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">5. Updates to this Policy</h2>
            <p>
              We reserve the right to modify this Cookie Policy to align with new site functions or cookie configurations. Any updates will be published directly on this page with an adjusted "Last Updated" timestamp.
            </p>
          </section>

          {/* Section 6: Contact */}
          <section className="space-y-4 pt-6 border-t border-black/10">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">6. Contact Information</h2>
            <p>
              If you have any questions, concerns, or queries regarding how we utilize cookies, please write or call:
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
