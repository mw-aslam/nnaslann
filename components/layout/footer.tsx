"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { SITE, SOCIAL_LINKS, NAV_LINKS } from "@/constants/data";
import { SocialIcon } from "@/components/layout/social-icon";

export function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tHero = useTranslations("hero");
  const year = new Date().getFullYear();

  function handleNavClick(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#030303]">
      <div className="bg-grid absolute inset-0 opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <span className="text-2xl font-semibold tracking-tight text-white">
              Arslan<span className="text-[var(--color-accent)]">.</span>
            </span>
            <p className="mt-3 max-w-sm text-sm text-white/40">{tHero("tagline")}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm text-white/50 transition-colors hover:text-white cursor-pointer"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <SocialIcon
                key={social.label}
                social={social}
                className="h-10 w-10 hover:-translate-y-1"
              />
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-white/30 md:flex-row">
          <p>&copy; {year} {SITE.name}. {tFooter("rights")}</p>
          <p>{tFooter("builtWith")}</p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-white/60 transition-colors hover:text-white cursor-pointer"
          >
            {tFooter("backToTop")} <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
