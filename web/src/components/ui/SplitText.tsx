"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_EDITORIAL, SPLIT_LINE_DURATION, SPLIT_LINE_STAGGER } from "@/lib/motion";

interface SplitTextProps {
  lines: string[];
  as?: "h1" | "h2" | "p";
  className?: string;
}

export function SplitText({ lines, as: Tag = "h1", className = "" }: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={index} className="line-mask">
          <motion.span
            initial={prefersReducedMotion ? { opacity: 0 } : { y: "105%", opacity: 0 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
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
    </Tag>
  );
}
