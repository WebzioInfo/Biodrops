import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import { ProcessHero, ProcessStepsGrid } from "@/components/sections/ProcessClient";

export const metadata: Metadata = {
  title: "14-Stage Purification Process - BIODROPS",
  description: "Explore the meticulous 14-stage purification process of BIODROPS. Sourced from ground water, sand-filtered, RO purified, micro-filtered, and UV sterilized.",
  alternates: {
    canonical: "https://biodropsindia.com/process",
  },
  openGraph: {
    title: "14-Stage Purification Process - BIODROPS",
    description: "Explore the meticulous 14-stage purification process of BIODROPS.",
    url: "https://biodropsindia.com/process",
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
  return (
    <div
      className="min-h-screen bg-[#F4F6F8] selection:bg-[#cfef00] selection:text-black"
      style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
    >

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
