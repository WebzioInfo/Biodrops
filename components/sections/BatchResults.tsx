"use client";

import { motion, Variants } from "framer-motion";
import { VerifyBatchResponse } from "@/services/publicVerification";
import { CheckCircle2, Factory, CalendarDays, ShieldCheck, Droplets, Download } from "lucide-react";

interface BatchResultsProps {
  batch: VerifyBatchResponse;
}

export function BatchResultsSkeleton() {
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
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64" />
        <div className="ml-auto w-24 h-8 bg-gray-200 rounded-full animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <motion.div key={i} variants={itemVariants} className="bg-gray-50 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 rounded bg-gray-200 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
            </div>
            {i === 4 && (
              <div className="mt-6 h-10 bg-gray-200 rounded-xl animate-pulse w-full" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
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

  const displayVal = (val: string | number | boolean | null | undefined) => {
    if (val === null || val === undefined || val === "" || Number.isNaN(val)) return "—";
    return String(val);
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
          {displayVal(batch.batchNumber)}
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
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Name:</span> {displayVal(batch.manufacturer.name)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Address:</span> {displayVal(batch.manufacturer.address)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Location:</span> {displayVal(batch.manufacturer.location)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">MFG Date:</span> {displayVal(batch.manufacturing.mfgDate)}</p>
          </div>
        </motion.div>

        {/* Expiry Details */}
        <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4 text-[#15b5a3]">
            <CalendarDays className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900">Expiry</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Best Before:</span> {displayVal(batch.manufacturing.bestBefore)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Shelf Life:</span> {displayVal(batch.manufacturing.shelfLife)}</p>
          </div>
        </motion.div>

        {/* Licenses */}
        <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4 text-[#15b5a3]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900">Licenses & Approvals</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">FSSAI:</span> {displayVal(batch.licenses.fssai)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">BIS:</span> {displayVal(batch.licenses.bis)}</p>
          </div>
        </motion.div>

        {/* Water Quality Reports */}
        <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-[#15b5a3]">
            <Droplets className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900">Water Quality</h3>
          </div>
          <div className="space-y-3 flex-1">
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">pH Level:</span> {displayVal(batch.waterQuality.ph)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">TDS:</span> {displayVal(batch.waterQuality.tds)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Turbidity:</span> {displayVal(batch.waterQuality.turbidity)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Microbiology:</span> {displayVal(batch.waterQuality.microbiology)}</p>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 text-sm">Sterilization:</span>
              {batch.waterQuality.uv === true && <span className="bg-[#15b5a3]/10 text-[#15b5a3] text-xs px-2 py-0.5 rounded-full font-medium">UV</span>}
              {batch.waterQuality.ozone === true && <span className="bg-[#15b5a3]/10 text-[#15b5a3] text-xs px-2 py-0.5 rounded-full font-medium">Ozone</span>}
              {(batch.waterQuality.uv !== true && batch.waterQuality.ozone !== true) && <span className="text-sm text-gray-600">—</span>}
            </div>
          </div>
          
          {/* Download Button */}
          <button
            onClick={() => {
              if (batch.report.available && batch.report.downloadUrl) {
                window.open(batch.report.downloadUrl, '_blank');
              }
            }}
            disabled={!batch.report.available}
            className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-[#15b5a3] text-[#15b5a3] hover:bg-[#15b5a3] hover:text-white disabled:border-gray-200 disabled:text-gray-400 disabled:bg-gray-50 disabled:hover:bg-gray-50 transition-colors rounded-xl font-medium text-sm shadow-sm"
          >
            <Download className="w-4 h-4" />
            {batch.report.available ? "Download Water Report" : "Report Not Available"}
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
