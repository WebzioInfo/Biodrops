import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "14-Stage Water Purification Process | Packaged Drinking Water | Biodrops",
  description: "Learn about Biodrops' state-of-the-art 14-stage water purification process. Featuring Sand Filtration, Reverse Osmosis (RO), Micro Filtration, and UV Sterilization. An initiative from Biofix.",
  keywords: ["14-Stage Water Purification", "Reverse Osmosis", "RO Water", "UV Sterilization", "Ozone Treatment", "Packaged Drinking Water Process", "Water Filtration", "Biofix Technology", "Biodrops Process"],
  openGraph: {
    title: "14-Stage Water Purification Process | Biodrops",
    description: "Learn about Biodrops' state-of-the-art 14-stage water purification process.",
  },
};

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
