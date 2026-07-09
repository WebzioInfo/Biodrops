import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import { ProcessHero, ProcessStepsGrid } from "@/components/sections/ProcessClient";

export const unstable_instant = { prefetch: "static" };

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
    title: "Raw Water Sourcing",
    desc: "Sourced directly from verified ground water authorities.",
    merit: "Assures a reliable, high-quality baseline from a protected and continually monitored natural source.",
  },
  {
    num: "02",
    title: "Raw Water Pump",
    desc: "Powered by a high-efficiency 3HP system.",
    merit: "Ensures consistent, reliable flow and pressure, forming a strong foundation for the entire purification chain.",
  },
  {
    num: "03",
    title: "Raw Water Storage",
    desc: "Held in a massive 9000-liter capacity holding tank.",
    merit: "Acts as a critical buffer that guarantees uninterrupted water supply even during peak processing demands.",
  },
  {
    num: "04",
    title: "Sand Filtration",
    desc: "Filters at 6000L/HR to remove large suspended particulates.",
    merit: "Our first line of defense effectively strips away physical debris, heavily protecting downstream sensitive equipment.",
  },
  {
    num: "05",
    title: "Activated Carbon Filter",
    desc: "Absorbs organics, chemicals, and odors at 6000L/HR.",
    merit: "Dramatically improves the taste profile while safely removing harmful chlorine and volatile organic compounds (VOCs).",
  },
  {
    num: "06",
    title: "5 Micron Filtration",
    desc: "Removes finer suspended particles at 6000L/HR.",
    merit: "A vital pre-treatment step that extends the life and efficiency of our delicate Reverse Osmosis membranes.",
  },
  {
    num: "07",
    title: "High Pressure Pump",
    desc: "Driven by a powerful, precision 7.5 HP motor.",
    merit: "Generates the immense osmotic pressure required to force water through semi-permeable membranes for true purification.",
  },
  {
    num: "08",
    title: "RO System (Reverse Osmosis)",
    desc: "State-of-the-art Reverse Osmosis processing at 6000 L/HR.",
    merit: "The core purification stage—removing up to 99% of all dissolved solids, heavy metals, and microscopic contaminants.",
  },
  {
    num: "09",
    title: "Intermediate Storage",
    desc: "5000L temporary, sterile storage for RO processed water.",
    merit: "Perfectly balances the slower flow rates of RO with the high-speed demands of our post-filtration stages.",
  },
  {
    num: "10",
    title: "Filter Feed Pump",
    desc: "4HP specialized pump regulating flow to micro filters.",
    merit: "Maintains precise, unwavering pressure to preserve the structural integrity of our microscopic filter meshes.",
  },
  {
    num: "11",
    title: "Micro Filtration",
    desc: "Cascading 0.1, 0.2, and 0.5 micron precision filters.",
    merit: "Captures incredibly minute impurities and potential bacteria that may have bypassed earlier, broader filtration stages.",
  },
  {
    num: "12",
    title: "UV Sterilization",
    desc: "High-intensity ultraviolet sterilization at 6000L/HR.",
    merit: "Instantly eradicates any remaining microbial life by disrupting their DNA, ensuring absolute biological safety.",
  },
  {
    num: "13",
    title: "Final Storage Tank",
    desc: "5000L sealed capacity holding pristine purified water.",
    merit: "Safely stores the final, perfected product in a sterile, temperature-controlled environment prior to bottling.",
  },
  {
    num: "14",
    title: "Hygienic Filling Point",
    desc: "State-of-the-art automatic hygienic filling station.",
    merit: "Ensures absolute zero contamination during the final bottling phase, sealing in the purity for the consumer.",
  },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#cfef00] selection:text-black pt-10">

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
    </main>
  );
}
