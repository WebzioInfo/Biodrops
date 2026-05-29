"use client";

import { useEffect, useRef } from "react";

export function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });
  const smoothed = useRef({ x: 0, y: 0 });
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const lerp = (start: number, end: number, t: number) =>
      start + (end - start) * t;

    const animate = () => {
      smoothed.current.x = lerp(smoothed.current.x, mouse.current.x, 0.05);
      smoothed.current.y = lerp(smoothed.current.y, mouse.current.y, 0.05);
      animRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return smoothed;
}
