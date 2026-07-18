"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BatchResults, { BatchResultsSkeleton } from "@/components/sections/BatchResults";
import { Search, Loader2, MapPin, ShieldCheck, Mail, Phone, FileText } from "lucide-react";
import { verifyBatch, VerifyBatchResponse, fetchOrganizations, Organization } from "@/services/publicVerification";
import Image from "next/image";

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

export default function KnowYourWaterForm() {
  const [batchNumber, setBatchNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const [result, setResult] = useState<VerifyBatchResponse | null>(null);

  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loadingOrgs, setLoadingOrgs] = useState(true);
  const [orgsError, setOrgsError] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadOrgs() {
      try {
        const response = await fetchOrganizations();
        if (mounted) {
          setOrgs(response.data || []);
          setLoadingOrgs(false);
        }
      } catch (err) {
        if (mounted) {
          setOrgsError(true);
          setLoadingOrgs(false);
        }
      }
    }
    loadOrgs();
    return () => { mounted = false; };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedBatch = batchNumber.trim().replace(/\s+/g, ' ');
    if (!sanitizedBatch) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await verifyBatch(sanitizedBatch, abortController.signal);
      setResult(data);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return; // Request was cancelled
      }
      if (err.message === "BATCH_NOT_FOUND") {
        setError({
          title: "Batch Not Found",
          message: "The entered batch number could not be verified. Please check the batch code and try again."
        });
      } else {
        setError({
          title: "Connection Error",
          message: "Unable to connect to the verification server. Please try again later."
        });
      }
    } finally {
      if (abortControllerRef.current === abortController) {
        setLoading(false);
        abortControllerRef.current = null;
      }
    }
  };

  return (
    <>
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
              disabled={loading}
              className="w-full py-5 px-4 text-lg bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-400 disabled:opacity-60"
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
              className="absolute top-full left-0 w-full mt-4 p-4 bg-white shadow-xl shadow-red-500/5 rounded-2xl border border-red-100 flex flex-col items-center justify-center text-center gap-1"
            >
              <p className="text-red-600 font-bold text-lg">{error.title}</p>
              <p className="text-gray-500 text-sm">{error.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results / Loading Area */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <BatchResultsSkeleton />
          </motion.div>
        )}
        {result && !loading && (
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
          className="max-w-6xl mx-auto mt-10"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">BQMS Certified Manufacturers</h2>
            <p className="text-sm text-gray-500">Quality assured water from our verified partners.</p>
          </div>

          <div className="mb-10">
            {loadingOrgs ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-gray-200 w-10 h-10 rounded-full shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-1.5"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : orgsError ? (
              <div className="text-center p-6 bg-white/50 rounded-xl border border-red-100 max-w-lg mx-auto">
                <p className="text-red-500 text-sm">Unable to load certified manufacturers. Please try again later.</p>
              </div>
            ) : orgs.length === 0 ? (
              <div className="text-center p-6 bg-white/50 rounded-xl border border-gray-200 max-w-lg mx-auto">
                <p className="text-gray-500 text-sm">No certified manufacturers available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {orgs.map((org) => (
                  <div key={org.id} className="bg-white p-4 rounded-[14px] shadow-sm border border-gray-100 flex flex-col hover:shadow-md hover:border-[#15b5a3]/30 hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="bg-[#15b5a3]/10 w-10 h-10 flex items-center justify-center rounded-full text-[#15b5a3] font-bold text-[14px] shrink-0 group-hover:scale-110 transition-transform">
                        {getInitials(org.name)}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <h3 className="font-semibold text-gray-900 text-[15px] leading-tight line-clamp-2">{org.name}</h3>
                        <div className="inline-flex items-center gap-1 text-[#15b5a3] mt-1.5 font-medium text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          BQMS Verified
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-auto text-[12.5px] text-gray-600">
                      {org.address && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-400" />
                          <p className="leading-tight">{org.address}</p>
                        </div>
                      )}
                      
                      {org.licenseNumber && (
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                          <p>{org.licenseNumber}</p>
                        </div>
                      )}

                      {org.contactEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                          <p className="truncate">{org.contactEmail}</p>
                        </div>
                      )}

                      {org.contactPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                          <p>{org.contactPhone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="max-w-xs mx-auto opacity-50 flex flex-col items-center">
            <p className="text-sm text-center mb-4">You can find the batch number printed near the barcode on the jar sleeve.</p>
            <div className="w-32 h-32 relative rounded-xl overflow-hidden grayscale border border-black/10">
              <Image src="/Biodrops_sleeve.jpeg" alt="Sleeve Example" fill sizes="128px" className="object-cover" />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
