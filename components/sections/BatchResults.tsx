"use client";

import { motion, Variants } from "framer-motion";
import { BatchDetails } from "@/data/mockBatches";
import { CheckCircle2, Factory, CalendarDays, ShieldCheck, Droplets, Download } from "lucide-react";

interface BatchResultsProps {
  batch: BatchDetails;
}

export default function BatchResults({ batch }: BatchResultsProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-4xl mx-auto mt-12 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
        <CheckCircle2 className="text-[#15b5a3] w-8 h-8" />
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Verified Batch Details</h2>
        <span className="ml-auto bg-[#15b5a3]/10 text-[#15b5a3] px-4 py-1.5 rounded-full font-mono font-medium text-sm">
          {batch.batchNumber}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Manufacturer Details */}
        <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4 text-[#15b5a3]">
            <Factory className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900">Manufacturer</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Name:</span> {batch.manufacturer.name}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Location:</span> {batch.manufacturer.location}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">MFG Date:</span> {batch.manufacturer.dateOfManufacturing}</p>
          </div>
        </motion.div>

        {/* Expiry Details */}
        <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4 text-[#15b5a3]">
            <CalendarDays className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900">Expiry</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Best Before:</span> {batch.expiry.bestBefore}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Shelf Life:</span> {batch.expiry.shelfLife}</p>
          </div>
        </motion.div>

        {/* Licenses */}
        <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4 text-[#15b5a3]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900">Licenses & Approvals</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">FSSAI:</span> {batch.licenses.fssai}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">BIS:</span> {batch.licenses.bis}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Quality Assured:</span> {batch.licenses.bqms}</p>
          </div>
        </motion.div>

        {/* Water Quality Reports */}
        <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-[#15b5a3]">
            <Droplets className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900">Water Quality</h3>
          </div>
          <div className="space-y-3 flex-1">
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">pH Level:</span> {batch.reports.phLevel}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">TDS:</span> {batch.reports.tds}</p>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 text-sm">Sterilization:</span>
              {batch.reports.uvSterilized && <span className="bg-[#15b5a3]/10 text-[#15b5a3] text-xs px-2 py-0.5 rounded-full font-medium">UV</span>}
              {batch.reports.ozoneTreated && <span className="bg-[#15b5a3]/10 text-[#15b5a3] text-xs px-2 py-0.5 rounded-full font-medium">Ozone</span>}
            </div>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Microbiology:</span> {batch.reports.microbiologyStatus}</p>
          </div>
          
          {/* Download Button */}
          <button className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-[#15b5a3] text-[#15b5a3] hover:bg-[#15b5a3] hover:text-white transition-colors rounded-xl font-medium text-sm shadow-sm">
            <Download className="w-4 h-4" />
            Download Water Report
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
