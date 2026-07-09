import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "BQMS - Biofix Quality Management System | Biodrops",
  description: "A complete professional single window support system specially designed for mineral water plant management. Manage lab, quality, licenses, and machinery effortlessly.",
  keywords: ["BQMS", "Biofix Quality Management System", "Mineral Water Plant Management", "FSSAI Licensing", "BIS Licensing", "Water Quality Lab Setting", "Water Plant Operations", "Quality Control Training", "Packaged Drinking Water Management", "Biofix"],
  openGraph: {
    title: "BQMS - Biofix Quality Management System",
    description: "A complete professional single window support system specially designed for mineral water plant management.",
    images: [{ url: "/bqms_images/bqms_coin.png" }],
  },
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
                  <Image src={feature.image} alt={feature.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
      <section className="py-8 md:py-16 bg-[#15b5a3] relative overflow-hidden font-archivo">
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

          {/* Left Text Content */}
          <div className="flex-1 text-left w-full md:w-auto z-10 pl:6 lg:pl-10 xl:pl-20">

            <div className="mb-8 md:mb-12">
              <h2 className="text-[2rem] md:text-[3rem] lg:text-[4rem] italic tracking-[3px] md:tracking-[5px] leading-none mb-3" style={{ color: "#f4ec2c", fontWeight: 700, WebkitTextStroke: "1px #f4ec2c", letterSpacing: "0.01em" }}>Manage Less.</h2>
              <p className="text-[0.9rem] md:text-[1rem] lg:text-[1.1rem] text-white leading-relaxed max-w-lg">
                BQMS, A complete professional single window support system specially designed for mineral water plant management.
              </p>
            </div>

            <div>
              <h2 className="text-[2rem] md:text-[3rem] lg:text-[4rem] italic tracking-[3px] md:tracking-[5px] leading-none mb-3" style={{ color: "#f4ec2c", fontWeight: 700, WebkitTextStroke: "1px #f4ec2c", letterSpacing: "0.01em" }}>Achieve More.</h2>
              <ul className="text-[0.9rem] md:text-[1rem] lg:text-[1.1rem] text-white space-y-2 leading-relaxed list-disc list-inside ml-1">
                <li>Stress Free Business and Effortless Operations</li>
                <li>Focus on Sales and Marketing</li>
                <li>Monthly Checkups and Reports</li>
                <li>Profit Formulas with Growth Assurance</li>
              </ul>
            </div>

          </div>

          {/* Right Content / Images */}
          <div className="shrink-0 relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] z-20 mt-8 md:mt-0">
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
              {/* Mobile center aligned */}
              <div
                className="w-full h-full bg-[#15b5a3] md:hidden"
                style={{
                  WebkitMask: 'url(/biofix_logo.png) center / contain no-repeat',
                  mask: 'url(/biofix_logo.png) center / contain no-repeat'
                }}
              />
              {/* Desktop left aligned */}
              <div
                className="hidden md:block w-full h-full bg-[#15b5a3]"
                style={{
                  WebkitMask: 'url(/biofix_logo.png) left center / contain no-repeat',
                  mask: 'url(/biofix_logo.png) left center / contain no-repeat'
                }}
              />
            </div>

            {/* Contact Details */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right gap-5">
              {/* Call Button */}
              <a
                href="https://wa.me/917510510947"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-[3px] border-[#15b5a3] text-[#15b5a3] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_8px_25px_rgba(21,181,163,0.35)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-[#15b5a3] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                <span className="relative z-10 flex items-center gap-3 font-bold text-xl md:text-2xl tracking-wide group-hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-call"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /><path d="M14.05 2a9 9 0 0 1 8 7.94" /><path d="M14.05 6A5 5 0 0 1 18 10" /></svg>
                  Call / WhatsApp: 7 510 510 947
                </span>
              </a>

              {/* Address */}
              <div className="flex flex-col items-center md:items-end gap-1.5 mt-2">
                <p className="text-gray-600 text-sm md:text-base font-semibold tracking-wide flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#15b5a3]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  MC Building, Bypass Road, Kondotty, 673638
                </p>
                <a href="https://biofixtechnology.com" target="_blank" rel="noopener noreferrer" className="text-[#15b5a3] font-bold text-base md:text-lg hover:text-teal-700 hover:underline underline-offset-4 transition-all flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>
                  biofixtechnology.com
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-400 border-t-[1.5px] mb-10" />

          {/* Bottom Row: Certifications */}
          <div className="grid grid-cols-2 md:flex md:flex-row md:flex-nowrap md:justify-between items-center justify-items-center gap-y-12 gap-x-8 md:gap-4 px-4 md:px-12 lg:px-24 mx-auto w-full max-w-6xl">
            <Image src="/bqms_images/State_Emblem.jpeg" alt="State Emblem" width={50} height={70} className="object-contain mix-blend-multiply hover:scale-105 transition-transform" />
            <Image src="/bqms_images/ISO.jpeg" alt="ISO 9001:2015" width={70} height={70} className="object-contain mix-blend-multiply hover:scale-105 transition-transform" />
            <Image src="/bqms_images/MSME.jpeg" alt="MSME" width={120} height={50} className="object-contain mix-blend-multiply hover:scale-105 transition-transform" />
            <Image src="/bqms_images/kerala.jpeg" alt="Kerala PCB" width={90} height={90} className="object-contain mix-blend-multiply hover:scale-105 transition-transform" />
            <Image src="/bqms_images/LIFE.jpeg" alt="LIFE" width={110} height={70} className="object-contain mix-blend-multiply hover:scale-105 transition-transform" />
            <Image src="/bqms_images/bqms_certificate.png" alt="BQMS Certificate" width={110} height={70} className="object-contain mix-blend-multiply hover:scale-105 transition-transform" />
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}
