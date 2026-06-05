import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Know Your Water | Verify Your Biodrops Batch | Transparent Quality",
  description: "Enter your Biodrops 20L jar batch number to instantly access manufacturing details, expiry dates, licenses, and verified water quality testing reports.",
  keywords: ["Know Your Water", "Biodrops Batch Tracking", "Water Quality Verification", "Track Drinking Water", "BIS Water Quality Report", "Packaged Drinking Water Batch Check", "Water Transparency", "Biofix Test Report"],
  openGraph: {
    title: "Know Your Water | Verify Your Biodrops Batch",
    description: "Enter your Biodrops 20L jar batch number to instantly access verified water quality testing reports.",
  },
};

export default function KnowYourWaterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
