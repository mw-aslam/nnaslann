"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { STATS } from "@/constants/data";
import { fadeUp, slideInLeft, slideInRight, viewportOnce } from "@/animations/variants";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 24, stiffness: 60 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = Math.round(latest).toString();
    });
  }, [springValue]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref}>0</span>
      <span>{suffix}</span>
    </span>
  );
}

export function About() {
  const t = useTranslations("about");
  const tags = t.raw("tags") as string[];

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-5">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-3"
        >
          <Card className="glow-border h-full p-8 sm:p-10">
            <p className="text-lg leading-relaxed text-white/70">{t("bio1")}</p>
            <p className="mt-5 text-lg leading-relaxed text-white/70">{t("bio2")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-6 lg:col-span-2"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Card className="glow-border flex h-full flex-col justify-between gap-3 p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="text-4xl font-semibold tracking-tight text-gradient-accent sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-white/50">{t(`stats.${stat.key}`)}</span>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
