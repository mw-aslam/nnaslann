"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { RotatingText } from "@/components/sections/rotating-text";
import { HeroAvatar } from "@/components/sections/hero-avatar";
import { Magnetic } from "@/components/layout/magnetic";
import { SocialIcon } from "@/components/layout/social-icon";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants/data";
import { textReveal } from "@/animations/variants";

export function Hero() {
  const t = useTranslations("hero");
  const headline = t("headline");
  const roles = t.raw("roles") as string[];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full max-w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-28 pb-16"
    >
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/60"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-glow)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-glow)]" />
          </span>
          {t("available")}
        </motion.div>

        {/* Hero Avatar Arched Dome Widget */}
        <HeroAvatar />

        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-block text-white"
          >
            {headline}
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-6 flex flex-wrap items-center justify-center text-center gap-x-2 gap-y-1 text-lg font-medium text-white/70 sm:text-2xl md:text-3xl"
        >
          <span className="whitespace-nowrap">{t("rolePrefix")}</span>
          <RotatingText words={roles} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/45 sm:text-lg"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="accent"
            size="lg"
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t("viewWork")} <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t("getInTouch")} <MessageCircle className="h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="mt-12 flex items-center gap-4"
        >
          {SOCIAL_LINKS.map((social) => (
            <Magnetic key={social.label} strength={0.4}>
              <SocialIcon social={social} />
            </Magnetic>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
