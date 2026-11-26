"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_EDITORIAL, SPLIT_LINE_DURATION, SPLIT_LINE_STAGGER } from "@/lib/motion";

interface SplitTextProps {
  lines: string[];
  as?: "h1" | "h2" | "p";
  className?: string;
}

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
} as const;

export function SplitText({ lines, as = "h1", className = "" }: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motionTags[as];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      className={className}
    >
      {lines.map((line, index) => (
        <span key={index} className="line-mask">
          <motion.span
            variants={{
              hidden: prefersReducedMotion ? { opacity: 0 } : { y: "100%", opacity: 0 },
              visible: prefersReducedMotion ? { opacity: 1 } : { y: "0%", opacity: 1 },
            }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : SPLIT_LINE_DURATION,
              delay: prefersReducedMotion ? 0 : index * SPLIT_LINE_STAGGER,
              ease: EASE_EDITORIAL,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
