"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollFade from "@/components/effects/ScrollFade";

function Field({ label, type = "text", name, value, onChange, required }: any) {
  const [focused, setFocused] = useState(false);
  const raised = focused || Boolean(value);

  return (
    <div className="relative pt-6 pb-1 mb-5 w-full text-center group" style={{ fontFamily: "'Inter', sans-serif" }}>
      <label
        className={`absolute left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 ease-out select-none ${
          raised
            ? "top-0.5 text-[0.68rem] tracking-[0.15em] font-semibold uppercase text-[#56C7D9]"
            : "top-[26px] text-sm md:text-[0.95rem] tracking-normal font-light text-[#6B7C80]"
        } ${focused ? "text-[#56C7D9]" : raised ? "text-[#6B7C80]" : ""}`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent border-none border-b border-[#070D0E]/15 py-2.5 px-2 font-sans text-sm md:text-base text-[#070D0E] outline-none text-center transition-colors duration-300"
        autoComplete="off"
        style={{ fontFamily: "'Inter', sans-serif" }}
      />
      {/* Animated active underline */}
      <span
        className={`block absolute bottom-0 left-0 right-0 h-[2px] w-full bg-[#56C7D9] origin-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          focused ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange }: any) {
  const [focused, setFocused] = useState(false);
  const raised = focused || Boolean(value);

  return (
    <div className="relative pt-6 pb-1 mb-6 w-full text-center group" style={{ fontFamily: "'Inter', sans-serif" }}>
      <label
        className={`absolute left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 ease-out select-none ${
          raised
            ? "top-0.5 text-[0.68rem] tracking-[0.15em] font-semibold uppercase text-[#56C7D9]"
            : "top-[26px] text-sm md:text-[0.95rem] tracking-normal font-light text-[#6B7C80]"
        } ${focused ? "text-[#56C7D9]" : raised ? "text-[#6B7C80]" : ""}`}
      >
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className="w-full bg-transparent border-none border-b border-[#070D0E]/15 py-2.5 px-2 font-sans text-sm md:text-base text-[#070D0E] outline-none text-center transition-colors duration-300 resize-none leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      />
      {/* Animated active underline */}
      <span
        className={`block absolute bottom-0 left-0 right-0 h-[2px] w-full bg-[#56C7D9] origin-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          focused ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e: any) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("sent");
  };

  return (
    <section id="contact" className="relative w-full bg-white py-20 md:py-28 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <ScrollFade
          amount={0.2}
          duration={0.6}
          yOffset={24}
          className="w-full max-w-[540px] flex flex-col items-center text-center font-sans"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {status === "sent" ? (
            <div className="flex flex-col items-center text-center w-full py-12">
              <div className="w-14 h-14 rounded-full bg-[#56C7D9]/10 text-[#56C7D9] border border-[#56C7D9]/20 flex items-center justify-center mb-6 shadow-sm">
                <svg width="20" height="15" viewBox="0 0 18 13" fill="none">
                  <path d="M1 6.5L6.5 12L17 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3
                className="text-3xl md:text-4xl text-[#070D0E] font-normal tracking-tight mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Message sent.
              </h3>
              <p className="text-sm md:text-base text-[#6B7C80] font-light leading-relaxed max-w-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                Thank you for reaching out. We will review your message and get in touch shortly.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center w-full">
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-4 text-[0.65rem] tracking-[0.35em] uppercase text-[#6B7C80] font-semibold mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="w-8 h-px bg-[#6B7C80]/30" />
                Contact
                <span className="w-8 h-px bg-[#6B7C80]/30" />
              </div>

              {/* Headline */}
              <h2
                className="text-[clamp(2.4rem,5.5vw,3.6rem)] font-light text-[#070D0E] tracking-tight leading-[1.08] mb-3 text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Get in <span className="text-[#56C7D9] font-medium">touch.</span>
              </h2>

              {/* Subheading */}
              <p
                className="text-sm md:text-base text-[#6B7C80] font-light max-w-md mx-auto leading-relaxed mb-6 text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                We would love to hear from you. Inquire about distribution, orders, or water analysis.
              </p>

              {/* Subtle designed divider */}
              <div className="flex items-center justify-center gap-2.5 w-full max-w-[180px] mx-auto mb-10">
                <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#070D0E]/15" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#56C7D9]" />
                <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#070D0E]/15" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col">
                <div className="flex flex-col w-full">
                  <Field label="Full name" name="name" value={form.name} onChange={handleChange} required />
                  <Field label="Email address" type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} />
                <Textarea label="Message" name="message" value={form.message} onChange={handleChange} />

                {/* Submit Button */}
                <div className="mt-6 flex justify-center w-full">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="group relative inline-flex items-center justify-center gap-2 px-10 py-3.5 bg-[#070D0E] hover:bg-[#111] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <span className="inline-flex items-center gap-1">
                        Sending
                        <motion.span animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="inline-block">.</motion.span>
                        <motion.span animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="inline-block">.</motion.span>
                        <motion.span animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="inline-block">.</motion.span>
                      </span>
                    ) : (
                      <span>Send message</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </ScrollFade>
      </div>
    </section>
  );
}
