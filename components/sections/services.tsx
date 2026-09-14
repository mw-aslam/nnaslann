"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { SERVICES } from "@/constants/data";
import { fadeUp, viewportOnce } from "@/animations/variants";

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <Card
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative flex h-full cursor-pointer flex-col gap-5 overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/40"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--color-accent)]/0 blur-2xl transition-all duration-500 group-hover:bg-[var(--color-accent)]/20" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--color-glow)]">
                <service.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {t(`items.${service.id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {t(`items.${service.id}.description`)}
                </p>
              </div>
              <ul className="mt-auto space-y-2 border-t border-white/[0.06] pt-4">
                {(t.raw(`items.${service.id}.features`) as string[]).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/45">
                    <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                    {f}
                  </li>
                ))}
              </ul>
              <span className="flex items-center gap-1 text-xs font-medium text-white/50 transition-colors group-hover:text-white">
                {t("ctaLabel")} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
