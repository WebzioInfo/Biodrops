import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import { ShieldCheck, Award, CheckCircle } from "lucide-react";
import ScrollFade from "@/components/effects/ScrollFade";

export const metadata: Metadata = {
  title: "BIS IS 14543 & FSSAI Certifications | BIODROPS Mineral Water",
  description:
    "BIODROPS is fully certified under Bureau of Indian Standards (BIS IS 14543), FSSAI food safety regulations, and ISO 9001:2015 quality standards under BQMS management.",
  keywords: [
    "BIS IS 14543 Certification",
    "FSSAI Water License Kerala",
    "ISI Mark Packaged Drinking Water",
    "Water Quality Compliance India",
    "ISO 9001 Mineral Water Plant",
    "Biodrops Certifications",
  ],
  alternates: {
    canonical: "https://www.biodropsindia.com/certifications",
  },
  openGraph: {
    title: "BIS IS 14543 & FSSAI Certifications | BIODROPS",
    description:
      "Adhering to strict BIS IS 14543 standards and valid FSSAI food safety licenses under BQMS management.",
    url: "https://www.biodropsindia.com/certifications",
    type: "website",
    images: [
      {
        url: "https://www.biodropsindia.com/images/premium-jar-studio.jpg",
        width: 1200,
        height: 630,
        alt: "BIODROPS BIS & FSSAI Certifications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BIS IS 14543 & FSSAI Certifications | BIODROPS",
    description: "Certified under BIS IS 14543, FSSAI, and ISO 9001:2015 standards.",
    images: ["https://www.biodropsindia.com/images/premium-jar-studio.jpg"],
  },
};

export default function CertificationsPage() {
  const certSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.biodropsindia.com/certifications/#webpage",
        "url": "https://www.biodropsindia.com/certifications",
        "name": "BIS IS 14543 & FSSAI Certifications | BIODROPS Mineral Water",
        "description": "National standards, BIS IS 14543 certifications, FSSAI licenses, and laboratory accreditations governing BIODROPS mineral water.",
        "isPartOf": {
          "@id": "https://www.biodropsindia.com/#website",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.biodropsindia.com/certifications/#breadcrumb",
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
            "name": "Certifications",
            "item": "https://www.biodropsindia.com/certifications",
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#56C7D9] selection:text-white pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(certSchema) }}
      />
      <div className="max-w-5xl mx-auto px-6 py-24">
        <ScrollFade amount={0.25} duration={0.6} className="text-center mb-20">
          <div className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-[#6B7C80] font-medium mb-6">
            <span className="w-12 h-px bg-[#6B7C80]/30" />
            Verified Quality
            <span className="w-12 h-px bg-[#6B7C80]/30" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#070D0E] mb-6 leading-tight">
            Our <span className="italic text-[#56C7D9]">Certifications.</span>
          </h1>
          <p className="text-xl text-[#070D0E]/60 max-w-2xl mx-auto font-light">
            Biodrops operates under the strictest national guidelines. We are fully compliant with Indian safety standards, ensuring that every drop you consume is completely safe.
          </p>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* BIS Certification */}
          <ScrollFade
            amount={0.2}
            delay={0}
            duration={0.55}
            yOffset={24}
            className="bg-white p-10 rounded-3xl shadow-sm border border-black/5 text-center group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-20 h-20 mx-auto bg-[#56C7D9]/10 text-[#56C7D9] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif text-[#070D0E] mb-3">BIS Certified</h2>
            <p className="text-[#070D0E]/60 mb-6">Bureau of Indian Standards</p>
            <p className="text-sm text-[#070D0E]/80">
              Our manufacturing facility and final packaged drinking water adhere to the rigorous IS 14543 standards mandated by the Government of India.
            </p>
          </ScrollFade>

          {/* FSSAI Certification */}
          <ScrollFade
            amount={0.2}
            delay={0.1}
            duration={0.55}
            yOffset={24}
            className="bg-white p-10 rounded-3xl shadow-sm border border-black/5 text-center group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-20 h-20 mx-auto bg-[#56C7D9]/10 text-[#56C7D9] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif text-[#070D0E] mb-3">FSSAI Approved</h2>
            <p className="text-[#070D0E]/60 mb-6">Food Safety and Standards Authority</p>
            <p className="text-sm text-[#070D0E]/80">
              We maintain the highest food safety practices, holding valid FSSAI licenses that certify our water is safe for direct human consumption.
            </p>
          </ScrollFade>

          {/* BQMS Certification */}
          <ScrollFade
            amount={0.2}
            delay={0.2}
            duration={0.55}
            yOffset={24}
            className="bg-white p-10 rounded-3xl shadow-sm border border-black/5 text-center group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-20 h-20 mx-auto bg-[#56C7D9]/10 text-[#56C7D9] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif text-[#070D0E] mb-3">BQMS Assured</h2>
            <p className="text-[#070D0E]/60 mb-6">Biofix Quality Management System</p>
            <p className="text-sm text-[#070D0E]/80">
              Our plant operates on the proprietary BQMS framework, ensuring continuous microbiological testing, zero-defect manufacturing, and operational excellence.
            </p>
          </ScrollFade>

        </div>
      </div>
      <Footer />
    </main>
  );
}
