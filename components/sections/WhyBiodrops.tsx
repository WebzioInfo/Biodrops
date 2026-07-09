"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const lines = [
  "Zero Contaminants.",
  "Perfectly Balanced pH.",
  "Untouched by human hands.",
  "Engineered for absolute purity."
];

// Pre-calculate the global index of each word for sequential scroll animation
let globalWordCount = 0;
const linesWithGlobalIndices = lines.map(line => {
  const lineWords = line.split(" ");
  const lineWordsWithIndices = lineWords.map(word => {
    const index = globalWordCount;
    globalWordCount++;
    return { word, index };
  });
  return lineWordsWithIndices;
});

function Word({ children, progress, range }: { children: string, progress: MotionValue<number>, range: number[] }) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className="relative inline-block text-[#070D0E] will-change-[opacity]">
      {children}
    </motion.span>
  );
}

export default function WhyBiodrops() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="why" className="relative min-h-screen w-full h-[300vh] bg-[#F4F6F8]">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/natural-source.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            y: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
          }}
        />


        {/* Eyebrow Header */}
        <div className="absolute top-12 md:top-24 left-0 right-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <div className="flex items-center gap-4 text-[0.65rem] tracking-[0.4em] uppercase text-[#070D0E]/50 font-medium mb-4">
            <span className="w-8 h-px bg-[#070D0E]/20" />
            The Standard
            <span className="w-8 h-px bg-[#070D0E]/20" />
          </div>
        </div>

        <div
          className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center flex flex-col items-center justify-center"
        >
          <div className="flex flex-col space-y-4 md:space-y-6 items-center justify-center w-full">
            {linesWithGlobalIndices.map((lineWords, lineIdx) => (
              <p
                key={lineIdx}
                className="text-[clamp(1.4rem,4.5vw,3.8rem)] leading-[1.2] tracking-tight font-medium flex flex-wrap justify-center text-center w-full"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                {lineWords.map(({ word, index }, wordIdx) => {
                  const start = (index / globalWordCount) * 0.8;
                  const end = start + (1 / globalWordCount) * 0.8;
                  return (
                    <span key={index} className="inline-flex items-center">
                      <Word progress={scrollYProgress} range={[start, end]}>
                        {word}
                      </Word>
                      {wordIdx < lineWords.length - 1 && <span className="w-[0.35em]" />}
                    </span>
                  );
                })}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
