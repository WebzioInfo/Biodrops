"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { AquoraBatchVerificationResponse, verifyAquoraBatch } from "@/services/aquoraPublicApi";
import { CheckCircle2, Factory, CalendarDays, ShieldCheck, Droplets, Download, Loader2 } from "lucide-react";
import { downloadWaterReportPdf } from "@/bqms-water-report-pdf";
import { adaptVerifyBatchToWaterReport, getWaterReportFilename } from "@/lib/biodropsWaterReportAdapter";

interface BatchResultsProps {
  batch: AquoraBatchVerificationResponse;
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
  const [downloading, setDownloading] = useState(false);

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

  const data = batch.data;
  const batchNo = data?.batchNumber || "—";
  const mfg = data?.manufacturing?.manufacturedDate;
  const shelfLife = data?.expiry?.shelfLifeMonths
    ? `${data.expiry.shelfLifeMonths} Months`
    : "6 Months";
  const bestBefore = data?.expiry?.bestBefore;

  const handleDownload = async () => {
    if (downloading || !data) return;
    try {
      setDownloading(true);
      let batchToAdapt = batch;
      try {
        const fullBatchResponse = await verifyAquoraBatch(batchNo, { full: true });
        if (fullBatchResponse?.success && fullBatchResponse.data) {
          batchToAdapt = fullBatchResponse;
        }
      } catch (err) {
        console.warn("Could not fetch full batch report details, falling back to summary batch data:", err);
      }
      const reportContract = adaptVerifyBatchToWaterReport(batchToAdapt);
      const filename = getWaterReportFilename(batchNo);
      await downloadWaterReportPdf(reportContract, filename);
    } catch (error) {
      console.error("Failed to generate water report PDF:", error);
    } finally {
      setDownloading(false);
    }
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
          {displayVal(batchNo)}
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
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Name:</span> {displayVal(data?.manufacturer?.name)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Address:</span> {displayVal(data?.manufacturer?.address)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Location:</span> {displayVal(data?.manufacturer?.location)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">MFG Date:</span> {displayVal(mfg)}</p>
          </div>
        </motion.div>

        {/* Expiry Details */}
        <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4 text-[#15b5a3]">
            <CalendarDays className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900">Expiry</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Best Before:</span> {displayVal(bestBefore)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Shelf Life:</span> {displayVal(shelfLife)}</p>
          </div>
        </motion.div>

        {/* Licenses */}
        <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4 text-[#15b5a3]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900">Licenses & Approvals</h3>
          </div>
          <div className="space-y-3">
            {data?.licenses?.fssai && data.licenses.fssai !== "—" && data.licenses.fssai.toLowerCase() !== "null" ? (
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">FSSAI:</span> {data.licenses.fssai}
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">FSSAI:</span>{" "}
                <span className="text-amber-600 font-medium text-xs bg-amber-50 px-2 py-0.5 rounded-md">Pending Registration</span>
              </p>
            )}

            {data?.licenses?.bis && 
             data.licenses.bis !== "—" && 
             data.licenses.bis.toLowerCase() !== "null" && 
             data.licenses.bis.toLowerCase() !== "fssai_compliant" && (
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">BIS (ISI Mark):</span> {data.licenses.bis}
              </p>
            )}

            {data?.licenses?.others && data.licenses.others.length > 0 && (
              data.licenses.others.map((lic, idx) => (
                <p key={idx} className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{lic.name}:</span> {lic.number}
                </p>
              ))
            )}

            <div className="pt-2 text-[11px] text-[#15b5a3] font-medium flex items-center gap-1.5 border-t border-gray-100">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Regulatory Verified Facility</span>
            </div>
          </div>
        </motion.div>

        {/* Water Quality Reports */}
        <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-[#15b5a3]">
            <Droplets className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900">Water Quality</h3>
          </div>
          <div className="space-y-3 flex-1">
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">pH Level:</span> {displayVal(data?.waterQuality?.ph)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">TDS:</span> {displayVal(data?.waterQuality?.tds)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Turbidity:</span> {displayVal(data?.waterQuality?.turbidity)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Microbiology:</span> {displayVal(data?.waterQuality?.microbiology)}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Sterilization:</span> {displayVal(data?.waterQuality?.sterilization)}</p>
          </div>
          
          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={downloading || data?.report?.available === false}
            className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-[#15b5a3] text-[#15b5a3] hover:bg-[#15b5a3] hover:text-white disabled:border-gray-200 disabled:text-gray-400 disabled:bg-gray-50 disabled:hover:bg-gray-50 transition-colors rounded-xl font-medium text-sm shadow-sm cursor-pointer disabled:cursor-not-allowed"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Water Report...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                {data?.report?.available !== false ? "Download Water Report" : "Report Not Available"}
              </>
            )}
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
