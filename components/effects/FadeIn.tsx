"use client";

import React from "react";
import ScrollFade, { type ScrollFadeDirection } from "./ScrollFade";

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  direction?: ScrollFadeDirection;
  amount?: number | "some" | "all";
  margin?: string;
  className?: string;
  blur?: boolean;
  style?: React.CSSProperties;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.55,
  y = 24,
  direction = "up",
  amount = 0.25,
  margin,
  className = "",
  blur = false,
  style,
}: FadeInProps) {
  return (
    <ScrollFade
      delay={delay}
      duration={duration}
      yOffset={y}
      direction={direction}
      amount={amount}
      margin={margin}
      className={className}
      blur={blur}
      style={style}
    >
      {children}
    </ScrollFade>
  );
}

export { ScrollFade };
