"use client";

import { useState } from "react";

function Field({ label, type = "text", name, value, onChange, required }: any) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value;

  return (
    <div className="cf-field">
      <label className={`cf-label ${raised ? "cf-label--raised" : ""} ${focused ? "cf-label--focused" : ""}`}>
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
        className="cf-input"
        autoComplete="off"
      />
      <span className={`cf-line ${focused ? "cf-line--active" : ""}`} />
    </div>
  );
}

function Textarea({ label, name, value, onChange }: any) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value;

  return (
    <div className="cf-field">
      <label className={`cf-label ${raised ? "cf-label--raised" : ""} ${focused ? "cf-label--focused" : ""}`}>
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={5}
        className="cf-input cf-textarea"
      />
      <span className={`cf-line ${focused ? "cf-line--active" : ""}`} />
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .cf-root *, .cf-root *::before, .cf-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cf-root {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
        }

        .cf-card {
          width: 100%;
          max-width: 520px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* Header */
        .cf-header-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        .cf-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 12px;
          text-align: center;
        }

        .cf-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(36px, 6vw, 52px);
          font-weight: 400;
          color: #111;
          line-height: 1.1;
          margin-bottom: 8px;
          text-align: center;
        }

        .cf-title em {
          font-style: italic;
          color: #555;
        }

        .cf-subtitle {
          font-size: 15px;
          color: #666;
          font-weight: 300;
          margin-bottom: 44px;
          line-height: 1.5;
          text-align: center;
        }

        /* Divider */
        .cf-divider {
          width: 32px;
          height: 1px;
          background: #ddd;
          margin: 0 auto 44px auto;
        }

        /* Fields */
        .cf-grid {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        form {
          width: 100%;
        }

        .cf-field {
          position: relative;
          padding-top: 20px;
          margin-bottom: 16px;
          width: 100%;
          text-align: center;
        }

        .cf-label {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 22px;
          font-size: 14px;
          font-weight: 400;
          color: #aaa;
          letter-spacing: 0.01em;
          pointer-events: none;
          transition: top 0.25s ease, font-size 0.25s ease, color 0.25s ease;
        }
        .cf-label--raised {
          top: 2px;
          font-size: 11px;
          letter-spacing: 0.08em;
          font-weight: 500;
          text-transform: uppercase;
        }
        .cf-label--focused { color: #111; }

        .cf-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #ddd;
          padding: 8px 0 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #111;
          outline: none;
          text-align: center;
          transition: border-color 0.25s ease;
        }
        .cf-input:focus { border-color: #111; }
        .cf-textarea { resize: none; line-height: 1.6; }

        .cf-line {
          display: block;
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          width: 100%;
          background: #111;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .cf-line--active { transform: scaleX(1); }

        /* Button */
        .cf-actions { margin-top: 12px; display: flex; justify-content: center; width: 100%; }

        .cf-btn {
          position: relative;
          overflow: hidden;
          background: #111;
          border: none;
          color: #fff;
          padding: 14px 48px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s;
          border-radius: 99px;
        }
        .cf-btn:hover { opacity: 0.82; }
        .cf-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .cf-dots span {
          display: inline-block;
          animation: dotPulse 1.2s infinite;
        }
        .cf-dots span:nth-child(2) { animation-delay: 0.2s; }
        .cf-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.25; }
          40% { opacity: 1; }
        }

        /* Success */
        .cf-success {
          animation: fadeUp 0.5s ease forwards;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }
        .cf-success-icon {
          width: 44px; height: 44px;
          border: 1px solid #111;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
        }
        .cf-success-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 36px;
          color: #111;
          margin-bottom: 8px;
        }
        .cf-success-sub {
          font-size: 14px;
          color: #888;
          font-weight: 300;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="cf-root">
        <div className="cf-card">
          {status === "sent" ? (
            <div className="cf-success">
              <div className="cf-success-icon">
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
                  <path d="M1 6.5L6.5 12L17 1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="cf-success-title">Message sent.</p>
              <p className="cf-success-sub">We'll be in touch shortly.</p>
            </div>
          ) : (
            <div className="cf-header-wrapper">
              <p className="cf-eyebrow">Contact</p>
              <h1 className="cf-title">Get in <em>touch.</em></h1>
              <p className="cf-subtitle">We'd love to hear from you.</p>
              <div className="cf-divider" />

              <form onSubmit={handleSubmit}>
                <div className="cf-grid">
                  <Field label="Full name" name="name" value={form.name} onChange={handleChange} required />
                  <Field label="Email address" type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} />
                <Textarea label="Message" name="message" value={form.message} onChange={handleChange} />

                <div className="cf-actions">
                  <button type="submit" disabled={status === "sending"} className="cf-btn">
                    {status === "sending" ? (
                      <span className="cf-dots">Sending<span>.</span><span>.</span><span>.</span></span>
                    ) : "Send message"}
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
