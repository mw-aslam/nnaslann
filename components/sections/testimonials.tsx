"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { TESTIMONIALS } from "@/constants/data";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  function go(dir: 1 | -1) {
    setDirection(dir);
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const testimonial = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative mx-auto max-w-4xl px-6 py-32">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="relative mt-16">
        <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]/20 blur-[100px]" />

        <div className="relative min-h-[320px] [perspective:1200px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={testimonial.id}
              custom={direction}
              initial={{ opacity: 0, rotateY: direction * 35, x: direction * 60 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: -direction * 35, x: -direction * 60 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="glow-border mx-auto max-w-2xl p-10 text-center">
                <Quote className="mx-auto h-8 w-8 text-[var(--color-accent)]/50" />
                <p className="mt-6 text-lg leading-relaxed text-white/75 sm:text-xl">
                  &ldquo;{t(`items.${testimonial.id}.content`)}&rdquo;
                </p>
                <div className="mt-6 flex justify-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--color-glow)] text-[var(--color-glow)]" />
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                    <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-white/45">
                      {t(`items.${testimonial.id}.role`)}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-[var(--color-accent)]" : "w-1.5 bg-white/20"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
