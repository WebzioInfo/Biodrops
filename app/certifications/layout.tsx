import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications & Compliance | FSSAI & BIS Certified Water",
  description: "View our official certifications including BIS (Bureau of Indian Standards), FSSAI, and BQMS quality assurance documents. Biodrops guarantees safe, verified drinking water.",
};

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
