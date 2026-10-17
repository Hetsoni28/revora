"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { expoOut } from "@/lib/easings";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in seconds (default 0) */
  delay?: number;
  /** Direction the element enters from (default "up") */
  direction?: "up" | "left" | "right" | "none";
  className?: string;
  /** Only play once when entering viewport (default true) */
  once?: boolean;
  /** Distance to travel in px (default 40) */
  distance?: number;
}

/**
 * Revora Scroll Reveal — wraps any child with a fade+slide entrance
 * triggered on viewport entry.
 *
 * @example
 * <Reveal delay={0.1}><h2>Our Products</h2></Reveal>
 * <Reveal direction="left" delay={0.2}><Card /></Reveal>
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
  distance = 40,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-5% 0px" });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? distance : 0,
      x:
        direction === "left" ? -distance
        : direction === "right" ? distance
        : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: expoOut,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

