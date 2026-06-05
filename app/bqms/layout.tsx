import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BQMS Certification | Biofix Quality Management System",
  description: "Learn about the Biofix Quality Management System (BQMS). A comprehensive Single Window System ensuring absolute compliance, testing, and purity for mineral water plants.",
};

export default function BQMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
