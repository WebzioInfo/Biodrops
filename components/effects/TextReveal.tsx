"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split into words
    const words = children.split(" ");
    container.innerHTML = words
      .map(
        (word) =>
          `<span class="word-wrap" style="display:inline-block; overflow:hidden; vertical-align:bottom; margin-right:0.25em;"><span class="word" style="display:inline-block;">${word}</span></span>`
      )
      .join(" ");

    const wordEls = container.querySelectorAll(".word");

    gsap.set(wordEls, { yPercent: 110, opacity: 0 });

    ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      once,
      onEnter: () => {
        gsap.to(wordEls, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.04,
          delay,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [children, delay, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
