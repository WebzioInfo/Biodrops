"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { EnrichedManufacturer } from "@/lib/manufacturerSlug";

interface ManufacturerGalleryProps {
  manufacturer: EnrichedManufacturer;
}

export default function ManufacturerGallery({
  manufacturer,
}: ManufacturerGalleryProps) {
  const images = manufacturer.galleryImages ?? [];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % images.length
        );
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev - 1 + images.length) % images.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="text-lg font-semibold text-[#070D0E] tracking-tight">
          Photo Gallery
        </h2>
      </div>

      {images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F4F6F8]/70 p-8 sm:p-10 text-center">
          <div className="w-12 h-12 rounded-full bg-white border border-[#E5E7EB] text-[#6B7C80] flex items-center justify-center mx-auto mb-3.5">
            <Camera className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-[#070D0E] mb-1">
            Facility Photographs Not Yet Published
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7C80] max-w-md mx-auto font-light leading-relaxed">
            Verified exterior, production line, and laboratory photographs for{" "}
            <span className="font-medium text-[#070D0E]">{manufacturer.name}</span>{" "}
            have not been uploaded to the public registry yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <button
              key={`${img.url}-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4F6F8] border border-[#E5E7EB] cursor-pointer text-left"
            >
              <Image
                src={img.url}
                alt={img.caption || `${manufacturer.name} facility photo ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <span className="text-xs font-medium text-white line-clamp-1">
                  {img.caption || "Facility Photo"}
                </span>
                <Maximize2 className="w-4 h-4 text-white shrink-0" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && images[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-[#070D0E]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
                  }}
                  className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((selectedIndex + 1) % images.length);
                  }}
                  className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl overflow-hidden bg-black"
            >
              <Image
                src={images[selectedIndex].url}
                alt={images[selectedIndex].caption || manufacturer.name}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

