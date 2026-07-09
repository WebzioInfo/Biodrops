import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import KnowYourWaterForm from "@/components/sections/KnowYourWaterForm";
import FadeIn from "@/components/effects/FadeIn";

export const unstable_instant = { prefetch: "static" };

export const metadata: Metadata = {
  title: "Know Your Water - Verify Batch | BIODROPS",
  description: "Enter your BIODROPS 20L jar sleeve batch number to instantly verify raw water sourcing details, BQMS laboratory reports, and safety licenses.",
  alternates: {
    canonical: "https://biodropsindia.com/KNOWYOURWATER",
  },
  openGraph: {
    title: "Know Your Water - Verify Batch | BIODROPS",
    description: "Enter your BIODROPS 20L jar sleeve batch number to instantly verify water quality and BQMS reports.",
    url: "https://biodropsindia.com/KNOWYOURWATER",
  },
};

const certifiedManufacturers = [
  {
    name: "Biofix Technology LLP",
    location: "MC Building, Bypass Road, Kondotty, Kerala 673638",
    code: "BT",
  },
  {
    name: "Gangothri Aqua Proccessing Unit",
    location: "Kokkur, Changarakulam, Kerala",
    code: "GA",
  }
];

export default function KnowYourWaterPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#15b5a3] selection:text-white flex flex-col">
      <Navbar />

      <div className="flex-grow pt-10 pb-24 px-4 sm:px-6 relative">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#e0f2f1] to-transparent -z-10" />

        <div className="max-w-3xl mx-auto text-center mb-12">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#070D0E] mb-6 leading-tight">
              Know Your <span className="italic text-[#15b5a3]">Water.</span>
            </h1>

            <p className="text-lg text-[#070D0E]/60 max-w-xl mx-auto">
              Enter the batch number found on your Biodrops 20L jar sleeve to instantly access complete manufacturing, quality, and certification details.
            </p>
          </FadeIn>
        </div>

        <KnowYourWaterForm certifiedManufacturers={certifiedManufacturers} />
      </div>
      <Footer />
    </main>
  );
}

