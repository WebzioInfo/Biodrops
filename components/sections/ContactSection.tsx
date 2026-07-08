"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function Field({ label, type = "text", name, value, onChange, required }: any) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value;

  return (
    <div className="relative pt-5 mb-4 w-full text-center">
      <label
        className={`absolute left-1/2 -translate-x-1/2 text-sm text-[#aaa] tracking-[0.01em] pointer-events-none transition-all duration-300 ease-in-out ${raised
          ? "top-0.5 text-[11px] tracking-[0.08em] font-medium uppercase"
          : "top-[22px] font-normal"
          } ${focused ? "text-[#111]" : ""}`}
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
        className="w-full bg-transparent border-none border-b border-[#ddd] focus:border-[#111] py-2 px-0 font-sans text-[15px] text-[#111] outline-none text-center transition-colors duration-300 ease-in-out"
        autoComplete="off"
      />
      <span
        className={`block absolute bottom-0 left-0 right-0 h-[1px] w-full bg-[#111] origin-center transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${focused ? "scale-x-100" : "scale-x-0"
          }`}
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange }: any) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value;

  return (
    <div className="relative pt-5 mb-4 w-full text-center">
      <label
        className={`absolute left-1/2 -translate-x-1/2 text-sm text-[#aaa] tracking-[0.01em] pointer-events-none transition-all duration-300 ease-in-out ${raised
          ? "top-0.5 text-[11px] tracking-[0.08em] font-medium uppercase"
          : "top-[22px] font-normal"
          } ${focused ? "text-[#111]" : ""}`}
      >
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={5}
        className="w-full bg-transparent border-none border-b border-[#ddd] focus:border-[#111] py-2 px-0 font-sans text-[15px] text-[#111] outline-none text-center transition-colors duration-300 ease-in-out resize-none leading-[1.6]"
      />
      <span
        className={`block absolute bottom-0 left-0 right-0 h-[1px] w-full bg-[#111] origin-center transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${focused ? "scale-x-100" : "scale-x-0"
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
    <section id="contact" className="relative w-full">
      <div className="font-sans bg-white min-h-screen flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-[520px] flex flex-col items-center text-center">
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center text-center w-full"
            >
              <div className="w-11 h-11 border border-[#111] rounded-full flex items-center justify-center mb-6">
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
                  <path d="M1 6.5L6.5 12L17 1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-serif text-[36px] text-[#111] mb-2">Message sent.</p>
              <p className="text-[14px] text-[#888] font-light">We'll be in touch shortly.</p>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center text-center w-full">
              <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#999] mb-3 text-center">Contact</p>
              <h1 className="font-serif text-[clamp(36px,6vw,52px)] font-normal text-[#111] leading-[1.1] mb-2 text-center">
                Get in <em className="italic text-[#555]">touch.</em>
              </h1>
              <p className="text-[15px] text-[#666] font-light mb-11 leading-[1.5] text-center">We'd love to hear from you.</p>
              <div className="w-8 h-[1px] bg-[#ddd] mx-auto mb-6" />

              <form onSubmit={handleSubmit} className="w-full flex flex-col">
                <div className="flex flex-col w-full">
                  <Field label="Full name" name="name" value={form.name} onChange={handleChange} required />
                  <Field label="Email address" type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} />
                <Textarea label="Message" name="message" value={form.message} onChange={handleChange} />

                <div className="mt-3 flex justify-center w-full">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="relative overflow-hidden bg-[#111] border-none text-white py-[14px] px-12 font-sans text-[13px] font-medium tracking-[0.08em] uppercase cursor-pointer transition-opacity duration-200 rounded-full hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <span className="inline-block">
                        Sending
                        <motion.span animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="inline-block">.</motion.span>
                        <motion.span animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="inline-block">.</motion.span>
                        <motion.span animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="inline-block">.</motion.span>
                      </span>
                    ) : (
                      "Send message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
