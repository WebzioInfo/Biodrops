import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | BIODROPS Packaged Drinking Water",
  description: "Read the official Terms and Conditions for BIODROPS. Learn about orders, payments, website usage policies, warranties, and liability limitations.",
  alternates: {
    canonical: "https://biodropsindia.com/terms",
  },
  openGraph: {
    title: "Terms and Conditions | BIODROPS Packaged Drinking Water",
    description: "Read the official Terms and Conditions for BIODROPS. Learn about orders, payments, website usage policies, warranties, and liability limitations.",
    url: "https://biodropsindia.com/terms",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | BIODROPS Packaged Drinking Water",
    description: "Read the official Terms and Conditions for BIODROPS. Learn about orders, payments, website usage policies, warranties, and liability limitations.",
  }
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#56C7D9] selection:text-white pt-10">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://biodropsindia.com/terms/#webpage",
                "url": "https://biodropsindia.com/terms",
                "name": "Terms and Conditions | BIODROPS Packaged Drinking Water",
                "description": "Read the official Terms and Conditions for BIODROPS. Learn about orders, payments, website usage policies, warranties, and liability limitations.",
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
                      "name": "Terms and Conditions",
                      "item": "https://biodropsindia.com/terms"
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
          <span className="text-[#070D0E]/80">Terms & Conditions</span>
        </nav>

        <div className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-[#6B7C80] font-medium mb-6">
          <span className="w-12 h-px bg-[#6B7C80]/30" />
          Agreement & Guidelines
        </div>

        <h1 className="text-4xl md:text-6xl font-serif text-[#070D0E] mb-8 leading-tight">
          Terms & <span className="italic text-[#56C7D9]">Conditions.</span>
        </h1>

        <div className="text-xs text-[#6B7C80] mb-12 border-b border-black/10 pb-4">
          Last Updated: July 9, 2026
        </div>

        <article className="prose prose-lg prose-gray max-w-none text-[#070D0E]/80 space-y-8 leading-relaxed">
          {/* Section 1: Acceptance */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using the <strong>BIODROPS</strong> website (https://biodropsindia.com) or purchasing products from us, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, you must immediately terminate use of our website and services.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and the brand's operating entity, <strong>Biofix Technology LLP</strong>.
            </p>
          </section>

          {/* Section 2: Website Usage */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">2. Website Usage</h2>
            <p>
              You agree to use this website only for lawful purposes related to water batch verification, customer inquiries, and purchasing. You are prohibited from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using the site to transmit malicious code, malware, or coordinate cyber attacks.</li>
              <li>Falsifying inputs or attempting to breach our batch verification database.</li>
              <li>Scraping content or media files without explicit written authorization from Biofix Technology LLP.</li>
            </ul>
          </section>

          {/* Section 3: Products */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">3. Products & Sizing</h2>
            <p>
              BIODROPS primarily supplies mineral-balanced packaged drinking water in 20-Liter reusable jars. We take extreme measures to ensure that the water inside every container satisfies Indian Standards (IS:14543) and is governed under BQMS specifications. Reusable jars must be stored in cool, sanitary environments to maintain outer integrity.
            </p>
          </section>

          {/* Section 4: Orders & Delivery */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">4. Orders & Delivery</h2>
            <p>
              Order inquiries placed via our website or associated WhatsApp channels constitute offers to purchase. We reserve the right to decline or cancel orders based on service availability, supply limitations, or geographic delivery limits in Kerala. It is the responsibility of the customer to provide safe access and clear drop-off points for our delivery personnel.
            </p>
          </section>

          {/* Section 5: Payments */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">5. Payments</h2>
            <p>
              Payment for water supplies must be processed via authorized payment systems, bank transfers, or cash on delivery. All charges are transparently listed during negotiations or corporate contract signing. Late payments or outstanding balances may result in temporary suspension of scheduled delivery routes.
            </p>
          </section>

          {/* Section 6: Intellectual Property */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">6. Intellectual Property</h2>
            <p>
              All contents, corporate images, logos, copy, designs, layouts, and software architectures on this website are the intellectual property of Biofix Technology LLP or its development agency, Webzio. You may not reproduce, adapt, distribute, or display any asset without prior written authorization.
            </p>
          </section>

          {/* Section 7: Limitations of Liability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">7. Limitations of Liability</h2>
            <p>
              To the fullest extent permitted by applicable laws, Biofix Technology LLP shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or utility, arising out of your access to or inability to use this website, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          {/* Section 8: Warranty Disclaimer */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">8. Warranty Disclaimer</h2>
            <p>
              This website and all services are provided on an "as is" and "as available" basis. We disclaim all warranties of any kind, whether express or implied, including the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the website will operate without interruptions or errors.
            </p>
          </section>

          {/* Section 9: Termination */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">9. Termination</h2>
            <p>
              We reserve the right to terminate or restrict your access to our website, verification portal, or delivery subscription routes at our sole discretion, without notice, for conduct that we believe violates these Terms and Conditions or is harmful to our brand, business assets, or other users.
            </p>
          </section>

          {/* Section 10: Governing Law */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">10. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by, construed, and enforced in accordance with the laws of India, without regard to conflict of law principles. Any dispute arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the state courts located in Kerala, India.
            </p>
          </section>

          {/* Section 11: Contact */}
          <section className="space-y-4 pt-6 border-t border-black/10">
            <h2 className="text-2xl font-bold font-serif text-[#070D0E]">11. Contact Support</h2>
            <p>
              If you have any questions, clarifications, or complaints regarding these Terms and Conditions, please contact us:
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
