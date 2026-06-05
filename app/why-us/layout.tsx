import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Choose Biodrops | Safe Drinking Water & BIS Certified | Premium Water",
  description: "Biodrops provides zero contaminants, perfectly pH balanced, and 100% sterile mineral water. Backed by Biofix Quality Management System (BQMS) and BIS certification.",
  keywords: ["Why Choose Biodrops", "Safe Drinking Water", "BIS Certified Water", "FSSAI Certified Water", "Premium Mineral Water", "pH Balanced Water", "100% Sterile Water", "BQMS Assured", "Best Water Kerala"],
  openGraph: {
    title: "Why Choose Biodrops | Safe Drinking Water",
    description: "Biodrops provides perfectly pH balanced, and 100% sterile mineral water.",
  },
};

export default function WhyUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
