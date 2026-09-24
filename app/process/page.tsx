import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import { ProcessHero, ProcessStepsGrid } from "@/components/sections/ProcessClient";

export const metadata: Metadata = {
  title: "14-Stage Water Purification Process | BIODROPS Mineral Water",
  description:
    "Explore the rigorous 14-stage water purification pipeline of BIODROPS in Kerala. Dual sand & carbon filtration, industrial Reverse Osmosis, 0.2µm polishing, and dual UV/Ozone sterilization.",
  keywords: [
    "14-Stage Water Purification Process",
    "Packaged Drinking Water Treatment",
    "Reverse Osmosis Plant Kerala",
    "Industrial Water Filtration",
    "UV Sterilization Drinking Water",
    "Ozonation Water Purification",
    "Biofix Water Technology",
    "IS 14543 Water Purification",
  ],
  alternates: {
    canonical: "https://biodropsindia.com/process",
  },
  openGraph: {
    title: "14-Stage Water Purification Process | BIODROPS",
    description:
      "Explore the clinical 14-stage purification process of BIODROPS: Dual-pass filtration, RO purification, sub-micron polishing, and UV/Ozone sterilization.",
    url: "https://biodropsindia.com/process",
    type: "website",
    images: [
      {
        url: "https://biodropsindia.com/images/premium-jar-studio.jpg",
        width: 1200,
        height: 630,
        alt: "BIODROPS 14-Stage Water Purification Process",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "14-Stage Water Purification Process | BIODROPS",
    description: "Dual-pass filtration, Reverse Osmosis, and UV/Ozone sterilization for pristine mineral water.",
    images: ["https://biodropsindia.com/images/premium-jar-studio.jpg"],
  },
};

const processSteps = [
  {
    num: "01",
    title: "Sand Media Filter",
    desc: "Multi-graded quartz sand beds filter physical turbidity and suspended particles.",
    merit: "Primary physical sediment removal down to 20 microns, safeguarding all downstream equipment.",
  },
  {
    num: "02",
    title: "Activated Carbon Filter",
    desc: "High-grade virgin coconut shell carbon adsorbs chlorine and organic compounds.",
    merit: "Eliminates unwanted odors and volatile organic compounds while restoring a clean, natural taste.",
  },
  {
    num: "03",
    title: "Iron Remover",
    desc: "Catalytic oxidation media strips out dissolved iron and manganese.",
    merit: "Eliminates metallic taste, yellowing, and prevents iron fouling of reverse osmosis membranes.",
  },
  {
    num: "04",
    title: "Secondary Sand Filter",
    desc: "Secondary fine sand and anthracite bed intercepts residual micro-flocs.",
    merit: "Provides dual-pass sediment protection to guarantee exceptionally clear water before reverse osmosis.",
  },
  {
    num: "05",
    title: "Secondary Carbon Filter",
    desc: "Polishing activated carbon column captures any trace organics.",
    merit: "Dual-pass adsorption guarantees 100% odor-free, fresh, and pristine water.",
  },
  {
    num: "06",
    title: "Reverse Osmosis (RO)",
    desc: "State-of-the-art semi-permeable Thin-Film Composite membrane array.",
    merit: "Core molecular purification eliminating up to 99% of dissolved salts, heavy metals, and micro-contaminants.",
  },
  {
    num: "07",
    title: "Intermediate Tank",
    desc: "Food-grade stainless steel reservoir balancing RO purified water flow.",
    merit: "Prevents pressure surges and safely balances water flow into remineralization and polishing.",
  },
  {
    num: "08",
    title: "Micron Filter 0.2",
    desc: "Clinical-grade 0.2-micron absolute pleated micro-cartridges.",
    merit: "Traps microscopic particulate matter, cellular fragments, and pyrogens with 99.999% retention.",
  },
  {
    num: "09",
    title: "Micron Filter 0.5",
    desc: "0.5-micron fine polishing micro-fiber filter.",
    merit: "Ensures diamond-like optical clarity and guards post-treatment stages against micro-sediment.",
  },
  {
    num: "10",
    title: "pH Boosting",
    desc: "Natural bio-active alkalizing media elevates water pH to 7.2 – 7.5.",
    merit: "Restores ideal alkaline balance matching human physiological equilibrium for optimal hydration.",
  },
  {
    num: "11",
    title: "Essential Minerals",
    desc: "Precision dosing unit re-infusing Calcium, Magnesium, and Potassium.",
    merit: "Enriches purified water with essential electrolytes as per IS 14543 standards for vibrant health.",
  },
  {
    num: "12",
    title: "UV Filtration",
    desc: "Continuous 254nm ultraviolet germicidal irradiation chamber.",
    merit: "Instantly neutralizes 99.99% of bacteria and viruses without heat, chemicals, or byproducts.",
  },
  {
    num: "13",
    title: "Ozonation",
    desc: "Micro-bubble ozone (O₃) injection into finished mineral water.",
    merit: "Powerful antimicrobial shield guaranteeing bottle shelf life before naturally converting to pure oxygen.",
  },
  {
    num: "14",
    title: "Sterile Cleanroom Storage",
    desc: "Positive-pressure sterile stainless steel holding reservoir with HEPA venting.",
    merit: "Guarantees zero contamination before automated robotic jar washing, clinical filling, and tamper-proof sealing.",
  },
];

export default function ProcessPage() {
  const processSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": "https://biodropsindia.com/process/#howto",
        "name": "14-Stage Mineral Water Purification Process",
        "description": "The complete 14-stage scientific purification process engineered by Biofix Technology LLP for BIODROPS premium packaged drinking water.",
        "image": "https://biodropsindia.com/images/premium-jar-studio.jpg",
        "step": processSteps.map((step, idx) => ({
          "@type": "HowToStep",
          "position": idx + 1,
          "name": `Stage ${step.num}: ${step.title}`,
          "text": `${step.desc} ${step.merit}`,
          "url": `https://biodropsindia.com/process#stage-${step.num}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://biodropsindia.com/process/#breadcrumb",
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
            "name": "Purification Process",
            "item": "https://biodropsindia.com/process",
          },
        ],
      },
    ],
  };

  return (
    <div
      className="min-h-screen bg-[#F4F6F8] selection:bg-[#cfef00] selection:text-black"
      style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(processSchema) }}
      />

      {/* Hero Section */}
      <section className="relative w-full pt-40 pb-24 px-6 overflow-hidden bg-[#070D0E] text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#56C7D9] via-transparent to-transparent blur-[100px]" />
        <ProcessHero />
      </section>

      {/* Process Steps */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <ProcessStepsGrid steps={processSteps} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
