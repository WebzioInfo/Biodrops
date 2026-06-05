"use client";

import { motion } from "framer-motion";
import Footer from "@/components/sections/Footer";
import { ShieldCheck, Award, CheckCircle } from "lucide-react";

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#56C7D9] selection:text-white pt-32">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-[#6B7C80] font-medium mb-6">
            <span className="w-12 h-px bg-[#6B7C80]/30" />
            Verified Quality
            <span className="w-12 h-px bg-[#6B7C80]/30" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#070D0E] mb-6 leading-tight">
            Our <span className="italic text-[#56C7D9]">Certifications.</span>
          </h1>
          <p className="text-xl text-[#070D0E]/60 max-w-2xl mx-auto font-light">
            Biodrops operates under the strictest national guidelines. We are fully compliant with Indian safety standards, ensuring that every drop you consume is completely safe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* BIS Certification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-black/5 text-center group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-20 h-20 mx-auto bg-[#56C7D9]/10 text-[#56C7D9] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif text-[#070D0E] mb-3">BIS Certified</h2>
            <p className="text-[#070D0E]/60 mb-6">Bureau of Indian Standards</p>
            <p className="text-sm text-[#070D0E]/80">
              Our manufacturing facility and final packaged drinking water adhere to the rigorous IS 14543 standards mandated by the Government of India.
            </p>
          </motion.div>

          {/* FSSAI Certification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-black/5 text-center group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-20 h-20 mx-auto bg-[#56C7D9]/10 text-[#56C7D9] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif text-[#070D0E] mb-3">FSSAI Approved</h2>
            <p className="text-[#070D0E]/60 mb-6">Food Safety and Standards Authority</p>
            <p className="text-sm text-[#070D0E]/80">
              We maintain the highest food safety practices, holding valid FSSAI licenses that certify our water is safe for direct human consumption.
            </p>
          </motion.div>

          {/* BQMS Certification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-black/5 text-center group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-20 h-20 mx-auto bg-[#56C7D9]/10 text-[#56C7D9] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif text-[#070D0E] mb-3">BQMS Assured</h2>
            <p className="text-[#070D0E]/60 mb-6">Biofix Quality Management System</p>
            <p className="text-sm text-[#070D0E]/80">
              Our plant operates on the proprietary BQMS framework, ensuring continuous microbiological testing, zero-defect manufacturing, and operational excellence.
            </p>
          </motion.div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
