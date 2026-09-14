"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ExternalLink, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { CERTIFICATES } from "@/constants/data";
import { fadeUp, viewportOnce } from "@/animations/variants";

export function Certificates() {
  const t = useTranslations("certificates");
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  }

  return (
    <section id="certificates" className="relative mx-auto max-w-6xl px-6 py-32">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <div className="flex gap-3">
          <button
            onClick={() => scroll(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <motion.div
        ref={scrollerRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {CERTIFICATES.map((cert) => (
          <Card
            key={cert.id}
            className="glass group w-[320px] shrink-0 snap-start overflow-hidden transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={cert.image}
                alt={t(`items.${cert.id}.title`)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <Award className="absolute right-4 top-4 h-5 w-5 text-[var(--color-glow)]" />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white">{t(`items.${cert.id}.title`)}</h3>
              <p className="mt-1 text-sm text-white/45">
                {t(`items.${cert.id}.issuer`)} &middot; {cert.date}
              </p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-white/50 transition-colors hover:text-white"
                >
                  {t("viewCredential")} <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </Card>
        ))}
      </motion.div>
    </section>
  );
}
