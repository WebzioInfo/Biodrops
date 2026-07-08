import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import FadeIn from "@/components/effects/FadeIn";

export const unstable_instant = { prefetch: "static" };

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) - BIODROPS",
  description: "Get answers to frequently asked questions about BIODROPS water purity, GWA sourcing, BQMS systems, and bulk water supply in Kerala.",
  alternates: {
    canonical: "https://biodropsindia.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) - BIODROPS",
    description: "Get answers to frequently asked questions about BIODROPS water purity, GWA sourcing, and BQMS systems.",
    url: "https://biodropsindia.com/faq",
  },
};

const faqs = [
  {
    question: "What makes Biodrops different from other packaged drinking water brands?",
    answer: "Biodrops is a premium mineral water brand, an initiative from Biofix Technology LLP. We employ a rigorous 14-stage purification process—including Sand Filtration, RO, Micro Filtration, and UV/Ozone sterilization—to guarantee absolute purity. Every drop is BIS and FSSAI certified, ensuring safety and quality."
  },
  {
    question: "Is Biodrops water BIS and ISI certified?",
    answer: "Yes, absolutely. Biodrops holds strict BIS (Bureau of Indian Standards) and ISI certifications. We operate under the Biofix Quality Management System (BQMS), which enforces continuous lab testing and compliance."
  },
  {
    question: "How do I verify the quality of the water I received?",
    answer: "Transparency is our priority. You can use our 'Know Your Water' feature on our website. Simply enter the batch number found on your 20L jar sleeve to instantly view the manufacturing date, expiry, licenses, and verified water quality testing reports for that specific batch."
  },
  {
    question: "Do you supply bulk drinking water for corporate offices in Kerala?",
    answer: "Yes. We specialize in commercial and corporate water supply. Biodrops provides hygienic 20L jars directly to offices, hospitals, and educational institutions, guaranteeing uninterrupted safe drinking water."
  },
  {
    question: "What does 'An Initiative from Biofix' mean?",
    answer: "Biofix Technology LLP is a recognized leader in water purification engineering. They design, build, and maintain water treatment plants. Biodrops is their flagship consumer product, created to showcase their uncompromising standards in water purification directly to the public."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#56C7D9] selection:text-white pt-10">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <FadeIn>
          <div className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-[#6B7C80] font-medium mb-6">
            <span className="w-12 h-px bg-[#6B7C80]/30" />
            Knowledge Base
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#070D0E] mb-12 leading-tight">
            Frequently Asked <span className="italic text-[#56C7D9]">Questions.</span>
          </h1>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-black/5"
              >
                <h2 className="text-2xl font-serif text-[#070D0E] mb-4">{faq.question}</h2>
                <p className="text-[#070D0E]/70 leading-relaxed text-lg">{faq.answer}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
      <Footer />
    </main>
  );
}
