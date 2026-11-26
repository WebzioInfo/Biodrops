import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import ManufacturerProfileClient from "@/components/manufacturers/ManufacturerProfileClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatSlugTitle(slug: string): string {
  return decodeURIComponent(slug || "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const displayName = formatSlugTitle(slug) || "Manufacturing Partner";

  return {
    title: `${displayName} | BIODROPS Manufacturing Partner`,
    description: `Explore ${displayName}, a certified BIODROPS mineral water manufacturing partner. View company profile, regulatory licenses, facility location, and contact details.`,
    alternates: {
      canonical: `https://www.biodropsindia.com/manufacture/${slug}`,
    },
  };
}

export default async function ManufacturerProfilePage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div
      className="min-h-screen bg-[#F4F6F8] selection:bg-[#cfef00] selection:text-black"
      style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
    >
      <ManufacturerProfileClient slug={slug} />
      <Footer />
    </div>
  );
}

