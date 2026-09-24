import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import ScrollFade from "@/components/effects/ScrollFade";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | BIODROPS Mineral Water",
  description:
    "Common questions answered about BIODROPS 14-stage purified packaged drinking water, BIS IS 14543 certifications, 20L corporate delivery in Kerala, and BQMS quality testing.",
  keywords: [
    "Biodrops FAQ",
    "Packaged Drinking Water FAQ Kerala",
    "BIS Certified Water Kerala FAQ",
    "20L Mineral Water Jar Delivery Calicut",
    "Biofix Water Questions",
    "Water Purity Testing Report",
  ],
  alternates: {
    canonical: "https://biodropsindia.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) | BIODROPS Mineral Water",
    description:
      "Get answers to frequently asked questions about BIODROPS water purity, 14-stage purification, BQMS systems, and bulk water supply in Kerala.",
    url: "https://biodropsindia.com/faq",
    type: "website",
    images: [
      {
        url: "https://biodropsindia.com/images/premium-jar-studio.jpg",
        width: 1200,
        height: 630,
        alt: "BIODROPS Mineral Water FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions (FAQ) | BIODROPS",
    description: "Common questions about BIODROPS water purity, BQMS testing, and 20L delivery in Kerala.",
    images: ["https://biodropsindia.com/images/premium-jar-studio.jpg"],
  },
};

const faqs = [
  {
    question: "What makes Biodrops different from other packaged drinking water brands?",
    answer: "Biodrops is a premium mineral water brand, an initiative from Biofix Technology LLP. We employ a rigorous 14-stage purification process—including Sand Filtration, RO, Micro Filtration, and UV/Ozone sterilization—to guarantee absolute purity. Every drop is BIS and FSSAI certified, ensuring safety and quality."
  },
  {
    question: "Is Biodrops water BIS and ISI certified?",
    answer: "Yes, absolutely. Biodrops holds strict BIS (Bureau of Indian Standards) and ISI certifications. We operate under the Biofix Quality Management System (BQMS), which enforces continuous lab testing and compliance with Indian Standard IS 14543."
  },
  {
    question: "How do I verify the quality of the water I received?",
    answer: "Transparency is our priority. You can use our 'Know Your Water' feature on our website. Simply enter the batch number found on your 20L jar sleeve to instantly view the manufacturing date, expiry, licenses, and verified water quality testing reports for that specific batch."
  },
  {
    question: "Do you supply bulk drinking water for corporate offices in Kerala?",
    answer: "Yes. We specialize in commercial and corporate water supply. Biodrops provides hygienic 20L jars directly to offices, hospitals, and educational institutions, guaranteeing uninterrupted safe drinking water across Kerala."
  },
  {
    question: "What does 'An Initiative from Biofix' mean?",
    answer: "Biofix Technology LLP is a recognized leader in water purification engineering. They design, build, and maintain water treatment plants. Biodrops is their flagship consumer product, created to showcase their uncompromising standards in water purification directly to the public."
  }
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": "https://biodropsindia.com/faq/#faqpage",
        "url": "https://biodropsindia.com/faq",
        "name": "Frequently Asked Questions (FAQ) | BIODROPS Mineral Water",
        "description": "Answers to common questions about BIODROPS 14-stage purified packaged drinking water in Kerala.",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://biodropsindia.com/faq/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://biodropsindia.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "FAQ",
            "item": "https://biodropsindia.com/faq",
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#56C7D9] selection:text-white pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <ScrollFade amount={0.25} duration={0.6} className="mb-12">
          <div className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-[#6B7C80] font-medium mb-6">
            <span className="w-12 h-px bg-[#6B7C80]/30" />
            Knowledge Base
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#070D0E] leading-tight">
            Frequently Asked <span className="italic text-[#56C7D9]">Questions.</span>
          </h1>
        </ScrollFade>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <ScrollFade
              key={index}
              amount={0.2}
              delay={index * 0.08}
              duration={0.55}
              yOffset={20}
              className="bg-white p-8 rounded-2xl shadow-sm border border-black/5"
            >
              <h2 className="text-2xl font-serif text-[#070D0E] mb-4">{faq.question}</h2>
              <p className="text-[#070D0E]/70 leading-relaxed text-lg">{faq.answer}</p>
            </ScrollFade>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
