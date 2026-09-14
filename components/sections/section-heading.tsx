"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/animations/variants";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <motion.span
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="eyebrow"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-5 text-base leading-relaxed text-white/50"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
