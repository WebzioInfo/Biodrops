import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import KnowYourWaterForm from "@/components/sections/KnowYourWaterForm";
import ScrollFade from "@/components/effects/ScrollFade";

export const metadata: Metadata = {
  title: "Know Your Water | Online Batch Verification & Lab Reports | BIODROPS",
  description:
    "Enter your BIODROPS 20L jar sleeve batch number to instantly verify real laboratory water test reports, TDS, pH, microbiology results, manufacturing dates, and BIS/FSSAI licenses.",
  keywords: [
    "Know Your Water",
    "Water Batch Verification Kerala",
    "Track Drinking Water Quality",
    "Biodrops Water Report",
    "BIS IS 14543 Test Report",
    "FSSAI Verification Water Kerala",
    "Packaged Drinking Water Lab Report",
  ],
  alternates: {
    canonical: "https://www.biodropsindia.com/KNOWYOURWATER",
  },
  openGraph: {
    title: "Know Your Water | Online Batch Verification | BIODROPS",
    description:
      "Enter your BIODROPS 20L jar sleeve batch number to inspect certified chemical and microbiological laboratory testing results.",
    url: "https://www.biodropsindia.com/KNOWYOURWATER",
    type: "website",
    images: [
      {
        url: "https://www.biodropsindia.com/images/premium-jar-studio.jpg",
        width: 1200,
        height: 630,
        alt: "BIODROPS Know Your Water Batch Verification",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Know Your Water | Online Batch Verification | BIODROPS",
    description: "Verify real chemical and microbiological testing reports for your BIODROPS jar.",
    images: ["https://www.biodropsindia.com/images/premium-jar-studio.jpg"],
  },
};

export default function KnowYourWaterPage() {
  const knowYourWaterSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.biodropsindia.com/KNOWYOURWATER/#app",
        "name": "BIODROPS Know Your Water Batch Verification",
        "url": "https://www.biodropsindia.com/KNOWYOURWATER",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "description": "Public verification system to inspect chemical, physical, and microbiological water quality reports for any BIODROPS 20L jar.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.biodropsindia.com/KNOWYOURWATER/#breadcrumb",
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
            "name": "Know Your Water",
            "item": "https://www.biodropsindia.com/KNOWYOURWATER",
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#15b5a3] selection:text-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(knowYourWaterSchema) }}
      />
      <div className="flex-grow pt-28 md:pt-32 pb-24 px-4 sm:px-6 relative">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#e0f2f1] to-transparent -z-10" />

        <div className="max-w-3xl mx-auto text-center mb-12">
          <ScrollFade amount={0.25} duration={0.6}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#070D0E] mb-6 leading-tight">
              Know Your <span className="italic text-[#15b5a3]">Water.</span>
            </h1>

            <p className="text-lg text-[#070D0E]/60 max-w-xl mx-auto">
              Enter the batch number found on your Biodrops 20L jar sleeve to instantly access complete manufacturing, quality, and certification details.
            </p>
          </ScrollFade>
        </div>

        <ScrollFade amount={0.2} delay={0.1} duration={0.6} yOffset={24}>
          <KnowYourWaterForm />
        </ScrollFade>
      </div>
      <Footer />
    </main>
  );
}

