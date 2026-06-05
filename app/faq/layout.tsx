import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Biodrops Mineral Water",
  description: "Find answers to your questions about Biodrops premium packaged drinking water, our 14-stage purification process, BIS certification, and corporate delivery.",
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
