"use client";

import React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

export type ScrollFadeDirection = "up" | "down" | "left" | "right" | "none";

export interface ScrollFadeProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  direction?: ScrollFadeDirection;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  amount?: number | "some" | "all";
  margin?: string;
  className?: string;
  blur?: boolean;
  style?: React.CSSProperties;
}

export default function ScrollFade({
  children,
  direction = "up",
  delay = 0,
  duration = 0.55,
  yOffset = 24,
  xOffset = 24,
  amount = 0.25,
  margin,
  className = "",
  blur = false,
  style,
  ...rest
}: ScrollFadeProps) {
  const getY = () => {
    if (direction === "up") return yOffset;
    if (direction === "down") return -yOffset;
    return 0;
  };

  const getX = () => {
    if (direction === "left") return xOffset;
    if (direction === "right") return -xOffset;
    return 0;
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: getY(),
      x: getX(),
      filter: blur ? "blur(6px)" : "none",
      transition: {
        duration: Math.max(0.35, duration * 0.75),
        ease: [0.16, 1, 0.3, 1],
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: blur ? "blur(0px)" : "none",
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount, margin }}
      variants={variants}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
