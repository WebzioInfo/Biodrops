import type { Metadata } from "next";
import ScrollFade from "@/components/effects/ScrollFade";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "About Us | Our Story & Vision | BIODROPS Mineral Water",
  description:
    "Learn about the vision behind BIODROPS, Kerala's premium packaged drinking water brand founded by Biofix Technology LLP. Engineered for absolute purity and scientific hydration.",
  keywords: [
    "About Biodrops",
    "Biofix Technology LLP",
    "Mineral Water Manufacturer Kerala",
    "Packaged Drinking Water Company",
    "Drinking Water Brand Calicut",
    "Water Treatment Engineers",
  ],
  alternates: {
    canonical: "https://www.biodropsindia.com/about",
  },
  openGraph: {
    title: "About Us | Our Story & Vision | BIODROPS Mineral Water",
    description:
      "Learn about the vision behind BIODROPS, Kerala's premium packaged drinking water brand founded by Biofix Technology LLP.",
    url: "https://www.biodropsindia.com/about",
    type: "website",
    images: [
      {
        url: "https://www.biodropsindia.com/images/premium-jar-studio.jpg",
        width: 1200,
        height: 630,
        alt: "About BIODROPS Mineral Water",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | BIODROPS Mineral Water",
    description: "The vision behind BIODROPS: Engineered by Biofix Technology LLP for absolute purity.",
    images: ["https://www.biodropsindia.com/images/premium-jar-studio.jpg"],
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://www.biodropsindia.com/about/#aboutpage",
        "url": "https://www.biodropsindia.com/about",
        "name": "About Us | Our Story & Vision | BIODROPS Mineral Water",
        "description": "The founding story and technological background of BIODROPS packaged drinking water by Biofix Technology LLP.",
        "isPartOf": {
          "@id": "https://www.biodropsindia.com/#website",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.biodropsindia.com/about/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.biodropsindia.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About Us",
            "item": "https://www.biodropsindia.com/about",
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#56C7D9] selection:text-white pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <ScrollFade amount={0.25} duration={0.6}>
          <div className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-[#6B7C80] font-medium mb-6">
            <span className="w-12 h-px bg-[#6B7C80]/30" />
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#070D0E] mb-8 leading-tight">
            The Vision Behind <span className="italic text-[#56C7D9]">Biodrops.</span>
          </h1>
        </ScrollFade>

        <ScrollFade amount={0.2} delay={0.1} duration={0.6} yOffset={20}>
          <div className="prose prose-lg prose-gray max-w-none text-[#070D0E]/80">
            <p className="lead text-xl md:text-2xl font-light mb-8">
              Biodrops is a premium packaged drinking water brand, an ambitious initiative launched by <strong>Biofix Technology LLP</strong>.
            </p>

            <h2 className="text-3xl font-serif text-[#070D0E] mt-12 mb-6">Who is Biofix?</h2>
            <p className="mb-6">
              Biofix Technology LLP is a recognized industry leader in comprehensive water purification engineering and quality management systems. With years of experience establishing state-of-the-art mineral water plants across India, Biofix identified a critical gap in the consumer market: the need for truly safe, rigorously tested, and scientifically purified drinking water delivered directly to homes and businesses.
            </p>

            <h2 className="text-3xl font-serif text-[#070D0E] mt-12 mb-6">The Birth of Biodrops</h2>
            <p className="mb-6">
              Leveraging their engineering expertise and their proprietary Biofix Quality Management System (BQMS), Biofix launched Biodrops. The goal was simple yet profound: To create a flagship consumer product that embodies absolute perfection in hydration.
            </p>
            <p>
              By controlling the entire manufacturing pipeline—from raw water sourcing to 14-stage RO purification, UV sterilization, and final packaging—Biodrops ensures that every 20L jar meets the strict standards set by the Bureau of Indian Standards (BIS) and the Food Safety and Standards Authority of India (FSSAI).
            </p>
          </div>
        </ScrollFade>
      </div>
      <Footer />
    </main>
  );
}
