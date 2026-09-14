"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { SKILLS } from "@/constants/data";
import { scaleIn, viewportOnce } from "@/animations/variants";
import { cn } from "@/lib/utils";

const CATEGORY_KEYS = ["all", "language", "frontend", "backend", "database", "tool", "ai"] as const;

export function TechStack() {
  const t = useTranslations("stack");
  const [category, setCategory] = useState<string>("all");

  const filtered = category === "all" ? SKILLS : SKILLS.filter((s) => s.category === category);

  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {CATEGORY_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-medium transition-all",
              category === key
                ? "border-white bg-white text-black"
                : "border-white/10 bg-white/[0.02] text-white/60 hover:text-white"
            )}
          >
            {t(`categories.${key}`)}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              variants={scaleIn}
              custom={i * 0.4}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.85 }}
              viewport={viewportOnce}
              whileHover={{ y: -6 }}
            >
              <Card className="group relative flex h-full flex-col items-center gap-4 overflow-hidden p-6 text-center transition-colors hover:border-[var(--color-accent)]/40">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/0 to-[var(--color-accent)]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-[var(--color-accent)]/10" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--color-accent)]/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                  <skill.icon className="h-7 w-7 text-white/80 transition-colors group-hover:text-white" />
                </div>
                <span className="relative text-sm font-medium text-white/80">{skill.name}</span>
                <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-glow)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={viewportOnce}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
