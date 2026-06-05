import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Biodrops - An Initiative from Biofix Technology",
  description: "Discover the story behind Biodrops. Founded by Biofix Technology LLP to deliver the highest standard of packaged drinking water in Kerala through advanced purification.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
