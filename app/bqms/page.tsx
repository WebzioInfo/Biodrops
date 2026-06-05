import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "BQMS - Biofix Quality Management System",
  description: "A complete professional single window support system specially designed for mineral water plant management.",
};

const bqmsFeatures = [
  {
    title: "Lab & Water Quality",
    titleColor: "#15b5a3",
    image: "/bqms_images/testing.jpeg",
    items: [
      { text: "Chemistry & Microbiology Lab Setting" },
      { text: "QC Training and Guidance" },
      { text: "Quality Issues Analysing and Solving" },
    ],
  },
  {
    title: "Licenses & Compliances",
    titleColor: "#15b5a3",
    image: "/bqms_images/licensing.jpeg",
    items: [
      { text: "FSSAI & BIS Licensing" },
      { text: "Daily & Monthly Filings" },
      { text: "Equipment Calibrations" },
    ],
  },
  {
    title: "Machinery & Operations",
    titleColor: "#15b5a3",
    image: "/bqms_images/machinery.jpeg",
    items: [
      { text: "Plant Machineries Checkups" },
      { text: "Monthly Evaluation Visits" },
      { text: "Technical breakdown support" },
    ],
  },
  {
    title: "Staff Performances",
    titleColor: "#15b5a3",
    image: "/bqms_images/staffs.jpeg",
    items: [
      { text: "Staff performance & hygiene training" },
      { text: "Monthly Meetings & Reviews" },
      { text: "Promoting responsible practices" },
    ],
  },
];

export default function BQMSPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section (Match PDF Design) */}
      <section className="relative min-h-screen pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-[#15b5a3] to-[#0e413a]">

        {/* Faded BQMS Text in Background like PDF */}
        <div className="absolute -left-30 md:left-0 top-0 h-full w-full md:w-32 lg:w-48 overflow-hidden pointer-events-none select-none z-0 opacity-[0.15] flex items-center justify-center font-black text-[#051c14] font-archivo mix-blend-overlay">
          <div className="text-[25vh] md:text-[35vh] lg:text-[45vh] leading-none shrink-0 tracking-[-0.08em] -rotate-90" style={{ WebkitTextStroke: "max(2px, 0.4vh) #051c14" }}>
            BQMS
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12">

          <div className="flex-1 md:pl-30 text-start
           lg:text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-white mb-6 leading-tight">
              Single window <br />
              system specially <br />
              designed for
              <div className="flex flex-col items-start gap-3 mt-6 text-3xl md:text-5xl lg:text-[3.5rem] font-black">
                <span className="bg-[#f4ec2c] text-black/70 px-4 py-1 md:py-2 leading-none">mineral water</span>
                <span className="bg-[#f4ec2c] text-black/70 px-4 py-1 md:py-2 leading-none">manufacturers</span>
              </div>
            </h1>
          </div>

          <div className="flex-1 relative w-full flex justify-center items-center lg:justify-center md:pt-0 pt-40 mb-8 lg:mb-0">
            {/* The newly generated premium BQMS coin image */}
            <div className="relative w-72 h-72 md:w-md md:h-112 animate-pulse-slow">
              <Image
                src="/bqms_images/bqms_coin.png"
                alt="BQMS Coin"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-2xl mix-blend-multiply"
                priority
              />
            </div>
          </div>
        </div>

      </section>

      {/* About Section (Archivo Font) */}
      <section id="features" className="py-24 font-archivo bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-26">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">What is BQMS?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              BQMS (Biofix Quality Management System) is an integrated quality management solution designed for mineral water plants to simplify and manage laboratory operations, FSSAI compliance, documentation, testing schedules, reporting, and quality monitoring under one system. BQMS helps plant owners maintain standards efficiently while reducing operational stress, delays, and compliance risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-26">
            {bqmsFeatures.map((feature, index) => (
              <div key={index} className="group flex flex-col">
                <h3 className="text-3xl mb-4" style={{ color: feature.titleColor, fontWeight: 700 }}>{feature.title}</h3>
                <div className="w-full h-48 md:h-80 relative mb-6 overflow-hidden shadow-sm">
                  <Image src={feature.image} alt={feature.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <ul className="space-y-3 text-gray-600">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2
                        className={"text-[#15b5a3] shrink-0 mt-0.5"}
                        size={20}
                      />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manage Less / Achieve More Section */}
      <section className="py-16 md:py-24 bg-[#15b5a3] relative overflow-hidden font-archivo">
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-row items-center justify-between gap-4 md:gap-12">

          {/* Left Text Content */}
          <div className="flex-1 text-left mx-40 z-10">

            <div className="mb-8 md:mb-12">
              <h2 className="text-[2.5rem] md:text-[5rem] italic tracking-[5px] leading-none mb-2 md:mb-4" style={{ color: "#f4ec2c", fontWeight: 700, WebkitTextStroke: "1px #f4ec2c", letterSpacing: "0.01em" }}>Manage Less.</h2>
              <p className="text-sm md:text-[1.4rem] text-white leading-tight">
                BQMS, A complete professional single window support system specially designed for mineral water plant management.
              </p>
            </div>

            <div>
              <h2 className="text-[2.5rem] md:text-[5rem] italic tracking-[5px] leading-none mb-2 md:mb-4" style={{ color: "#f4ec2c", fontWeight: 700, WebkitTextStroke: "1px #f4ec2c", letterSpacing: "0.01em" }}>Achieve More.</h2>
              <ul className="text-sm md:text-[1.4rem] text-white space-y-1 md:space-y-1.5 leading-tight">
                <li>Stress Free Business and Effortless Operations</li>
                <li>Focus on Sales and Marketing</li>
                <li>Monthly Checkups and Reports</li>
                <li>Profit Formulas with Growth Assurance</li>
              </ul>
            </div>

          </div>

          {/* Right Content / Images */}
          <div className="shrink-0 relative w-32 h-32 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] z-20">
            <Image
              src="/bqms_images/bqms_seal.png"
              alt="BQMS Quality Seal"
              fill
              className="object-contain"
            />
          </div>

        </div>
      </section>

      {/* Footer / Contact Section (Matches Screenshot Exactly) */}
      <section id="contact" className="py-16 bg-white font-archivo">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Top Row: Logo & Contact */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            {/* Biofix Logo */}
            <div className="relative w-64 h-24 md:w-96 md:h-32 shrink-0">
              <Image src="/biofix_logo.png" alt="Biofix Technology LLP" fill className="object-contain object-center md:object-left" />
            </div>

            {/* Contact Details */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              {/* Call Button */}
              <div className="border-[3px] border-[#15b5a3] rounded-full px-6 md:px-10 py-3 md:py-4 mb-4 inline-block">
                <p className="text-xl md:text-[1.75rem] font-bold tracking-tight">
                  <span className="text-[#15b5a3]">Call/</span>
                  <a href="https://wa.me/917510510947" className="text-blue-600 underline decoration-blue-600 underline-offset-4 mx-1">Whatsapp</a>
                  <span className="text-[#15b5a3]"> Now: 7 510 510 947</span>
                </p>
              </div>
              
              {/* Address */}
              <p className="text-gray-800 text-sm md:text-lg font-semibold tracking-wide">
                MC Building, Bypass Road, Kondotty, 673638 / <a href="https://biofixtechnology.com" className="hover:text-[#15b5a3] transition-colors">biofixtechnology.com</a>
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-400 border-t-[1.5px] mb-10" />

          {/* Bottom Row: Certifications */}
          <div className="flex flex-wrap justify-between items-center gap-6">
            <Image src="/bqms_images/State_Emblem.jpeg" alt="State Emblem" width={70} height={90} className="object-contain mix-blend-multiply" />
            <Image src="/bqms_images/ISO.jpeg" alt="ISO 9001:2015" width={90} height={90} className="object-contain mix-blend-multiply" />
            <Image src="/bqms_images/MSME.jpeg" alt="MSME" width={140} height={70} className="object-contain mix-blend-multiply" />
            <Image src="/bqms_images/kerala.jpeg" alt="Kerala PCB" width={130} height={70} className="object-contain mix-blend-multiply" />
            <Image src="/bqms_images/LIFE.jpeg" alt="LIFE" width={110} height={70} className="object-contain mix-blend-multiply" />
            <Image src="/bqms_images/page0_img16.jpeg" alt="Govt Approved Lab" width={100} height={100} className="object-contain mix-blend-multiply" />
          </div>
          
        </div>
      </section>
    </div>
  );
}
