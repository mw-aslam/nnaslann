"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { NAV_LINKS } from "@/constants/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Button } from "@/components/ui/button";

import { getLenis } from "@/hooks/useLenis";

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.href.replace("#", "")));

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(href: string) {
    setMobileOpen(false);
    const lenis = getLenis();
    const target = document.querySelector(href);
    if (lenis && target) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-[80] flex justify-center px-3 sm:px-6 transition-all duration-500",
        scrolled ? "pt-2.5 sm:pt-3" : "pt-4 sm:pt-6"
      )}
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 sm:px-5 sm:py-3 transition-all duration-500",
          scrolled
            ? "glass-strong border-white/10 shadow-lg shadow-black/30"
            : "border-white/10 bg-black/60 backdrop-blur-md sm:border-transparent sm:bg-transparent"
        )}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="font-mono text-lg sm:text-xl font-extrabold tracking-tight text-white transition-all hover:opacity-80 cursor-pointer"
        >
          Arslan
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors cursor-pointer",
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/8 border border-white/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(link.labelKey)}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher />
          <Button
            size="sm"
            variant="accent"
            asChild
            className="hidden sm:inline-flex cursor-pointer"
          >
            <a href="/Arslan_Titerbayev_CV.pdf" download="Arslan_Titerbayev_CV.pdf">
              <Download className="h-3.5 w-3.5" />
              {t("resume")}
            </a>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="hidden md:inline-flex cursor-pointer"
            onClick={() => handleNavClick("#contact")}
          >
            {t("letsTalk")}
          </Button>
          <button
            className="rounded-full border border-white/10 p-2 text-white lg:hidden cursor-pointer"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass-strong absolute left-1/2 top-16 sm:top-20 w-[92vw] max-w-md -translate-x-1/2 rounded-2xl border border-white/10 p-4 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="rounded-lg px-4 py-3 text-xl font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
              >
                {t(link.labelKey)}
              </a>
            ))}
            <a
              href="/Arslan_Titerbayev_CV.pdf"
              download="Arslan_Titerbayev_CV.pdf"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-center text-base font-semibold text-black transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              {t("downloadResume")}
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
