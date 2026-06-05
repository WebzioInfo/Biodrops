"use client";

import { motion } from "framer-motion";
import Footer from "@/components/sections/Footer";

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
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#cfef00] selection:text-black">

      {/* Hero Section */}
      <section className="relative w-full pt-40 pb-24 px-6 overflow-hidden bg-[#070D0E] text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#56C7D9] via-transparent to-transparent blur-[100px]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-white/60 font-medium mb-6"
          >
            <span className="w-12 h-px bg-[#cfef00]/50" />
            The Standard of Purity
            <span className="w-12 h-px bg-[#cfef00]/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.1] mb-6 font-serif"
          >
            Fourteen Stages of <span className="italic text-[#cfef00] font-medium">Perfection.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed"
          >
            Discover the meticulous, state-of-the-art purification process that transforms raw natural water into the pristine, perfectly balanced Biodrops standard.
          </motion.p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-12 md:gap-24">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${!isEven ? "md:flex-row-reverse" : ""
                    }`}
                >
                  {/* Visual Number Container */}
                  <div className="w-full md:w-1/2 flex justify-center relative">
                    <div className="text-[clamp(8rem,15vw,15rem)] font-bold text-[#070D0E]/5 leading-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      {step.num}
                    </div>
                    <div className="relative z-10 w-full max-w-[400px] aspect-square rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col items-center justify-center p-8 text-center group hover:-translate-y-2 transition-transform duration-500">
                      <div className="w-16 h-16 rounded-full bg-[#cfef00]/20 text-[#070D0E] flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-[#cfef00] group-hover:scale-110 transition-all duration-300">
                        {step.num}
                      </div>
                      <h3 className="text-2xl font-serif text-[#070D0E] mb-4">{step.title}</h3>
                      <p className="text-sm text-[#070D0E]/60">{step.desc}</p>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/5">
                      <div className="text-[11px] font-bold tracking-[0.2em] text-[#56C7D9] uppercase mb-4">The Advantage</div>
                      <h4 className="text-2xl md:text-3xl font-light text-[#070D0E] leading-snug mb-6">
                        Why this step <span className="font-medium italic">matters</span>.
                      </h4>
                      <p className="text-[#070D0E]/70 leading-relaxed text-lg font-light">
                        {step.merit}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
