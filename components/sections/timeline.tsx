"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/sections/section-heading";
import { TIMELINE } from "@/constants/data";
import { fadeUp, viewportOnce } from "@/animations/variants";

export function Timeline() {
  const t = useTranslations("timeline");
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });
  const beamScale = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" className="relative mx-auto max-w-4xl px-6 py-32">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

      <div ref={trackRef} className="relative mt-20">
        <div className="absolute left-[9px] top-3 bottom-3 w-[2px] bg-white/10" />
        <motion.div
          style={{ scaleY: beamScale }}
          className="absolute left-[9px] top-3 bottom-3 w-[2px] origin-top bg-gradient-to-b from-white via-white to-white/30 shadow-[0_0_16px_2px_rgba(255,255,255,0.8)]"
        />
        <div className="flex flex-col gap-20 sm:gap-24">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="relative flex gap-8 pl-12"
            >
              <span className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-white bg-[#050505] shadow-[0_0_16px_rgba(255,255,255,0.8)]" />
              <div>
                <span className="text-sm font-bold tracking-wider text-[var(--color-glow)]">{item.year}</span>
                <h3 className="mt-1.5 text-xl font-semibold text-white">
                  {t(`items.${item.id}.title`)}
                </h3>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-white/60">
                  {t(`items.${item.id}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
