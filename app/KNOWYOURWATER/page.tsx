"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import BatchResults from "@/components/sections/BatchResults";
import { mockBatches, BatchDetails } from "@/data/mockBatches";
import { Search, Loader2, Factory, MapPin } from "lucide-react";
import Image from "next/image";

// Extract unique manufacturers
const uniqueManufacturers = Array.from(
  new Map(
    Object.values(mockBatches).map((batch) => [batch.manufacturer.name, batch.manufacturer])
  ).values()
);

export default function KnowYourWaterPage() {
  const [batchNumber, setBatchNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<BatchDetails | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchNumber.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    // Simulate network request
    setTimeout(() => {
      const foundBatch = mockBatches[batchNumber.trim().toUpperCase()];
      if (foundBatch) {
        setResult(foundBatch);
      } else {
        setError("Batch not found. Please check your batch number and try again.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#15b5a3] selection:text-white flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-4 sm:px-6 relative">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#e0f2f1] to-transparent -z-10" />

        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#070D0E] mb-6 leading-tight"
          >
            Know Your <span className="italic text-[#15b5a3]">Water.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#070D0E]/60 max-w-xl mx-auto"
          >
            Enter the batch number found on your Biodrops 20L jar sleeve to instantly access complete manufacturing, quality, and certification details.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto relative z-10"
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-[#15b5a3]/5 border border-gray-200 overflow-hidden group focus-within:border-[#15b5a3]/50 focus-within:ring-4 focus-within:ring-[#15b5a3]/10 transition-all duration-300">
              <div className="pl-6 text-gray-400">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                placeholder="Enter Batch Number (e.g., BD-2026-06A)"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                className="w-full py-5 px-4 text-lg bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={loading || !batchNumber.trim()}
                className="mx-2 px-8 py-3 bg-[#15b5a3] hover:bg-[#129c8d] disabled:bg-gray-200 disabled:text-gray-500 text-white font-bold rounded-xl transition-colors duration-200 flex items-center justify-center min-w-[120px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify"}
              </button>
            </div>
          </form>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 w-full mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm border border-red-100"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <BatchResults batch={result} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Default View: Manufacturers List & Hint */}
        {!result && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">BQMS Certified Manufacturers</h2>
              <p className="text-gray-500">Quality assured water from our verified partners.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {uniqueManufacturers.map((mfg, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="bg-[#15b5a3]/10 p-3 rounded-xl text-[#15b5a3] shrink-0">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{mfg.name}</h3>
                    <div className="flex items-start gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>{mfg.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-xs mx-auto opacity-50 flex flex-col items-center">
              <p className="text-sm text-center mb-4">You can find the batch number printed near the barcode on the jar sleeve.</p>
              <div className="w-32 h-32 relative rounded-xl overflow-hidden grayscale border border-black/10">
                <Image src="/Biodrops_sleeve.jpeg" alt="Sleeve Example" fill className="object-cover" />
              </div>
            </div>
          </motion.div>
        )}

      </div>
      <Footer />
    </main>
  );
}
