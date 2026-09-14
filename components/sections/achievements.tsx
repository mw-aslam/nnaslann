"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { ACHIEVEMENTS } from "@/constants/data";
import { scaleIn, viewportOnce } from "@/animations/variants";

export function Achievements() {
  const t = useTranslations("achievements");

  return (
    <section id="achievements" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((item, i) => (
          <motion.div
            key={item.id}
            variants={scaleIn}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            whileHover={{ y: -6 }}
          >
            <Card className="glow-border group flex h-full flex-col gap-4 p-7 transition-colors hover:border-[var(--color-accent)]/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[var(--color-accent)]/10 text-[var(--color-glow)] transition-transform duration-300 group-hover:scale-110">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/35">
                  {item.date}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {t(`items.${item.id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {t(`items.${item.id}.description`)}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
