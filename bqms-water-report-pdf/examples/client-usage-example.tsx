"use client";

import React, { useState } from "react";
import { downloadWaterReportPdf } from "../utils/generator";
import { SAMPLE_WATER_REPORT } from "./sample-data";

export function WaterReportDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      // Downloads report directly in the browser
      await downloadWaterReportPdf(SAMPLE_WATER_REPORT);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please check console.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      style={{
        padding: "10px 20px",
        backgroundColor: "#0D9488",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: isGenerating ? "not-allowed" : "pointer"
      }}
    >
      {isGenerating ? "Generating Water Report PDF..." : "Download Water Test Report (PDF)"}
    </button>
  );
}
