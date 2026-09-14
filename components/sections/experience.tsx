"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { EXPERIENCE } from "@/constants/data";
import { fadeUp, viewportOnce } from "@/animations/variants";

export function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-32">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="relative mt-16">
        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-accent)] via-white/10 to-transparent sm:left-1/2" />

        <div className="flex flex-col gap-12">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.id}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={`relative flex flex-col gap-6 sm:flex-row ${
                i % 2 === 1 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-0 top-1.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-accent)]/40 bg-[#0b0b0b] sm:left-1/2 sm:-translate-x-1/2">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
              </div>

              <div className="w-full pl-14 sm:w-1/2 sm:pl-0">
                <div className={i % 2 === 1 ? "sm:pl-12" : "sm:pr-12"}>
                  <Card className="glow-border p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
                    <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-glow)]">
                      {t(`items.${exp.id}.period`)}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {t(`items.${exp.id}.role`)}
                    </h3>
                    <p className="mt-1 text-sm text-white/50">{exp.company}</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/60">
                      {t(`items.${exp.id}.description`)}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {(t.raw(`items.${exp.id}.points`) as string[]).map((point) => (
                        <li key={point} className="flex gap-2 text-sm text-white/50">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
              <div className="hidden w-1/2 sm:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
