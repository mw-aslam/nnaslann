"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  ru: "Русский",
  uz: "O'zbekcha",
};

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(nextLocale: string) {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("label")}
        className="flex h-9 w-9 shrink-0 aspect-square items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-colors hover:text-white"
      >
        <Globe className="h-4 w-4" />
      </button>

      {open && (
        <div className="glass-strong absolute right-0 top-11 z-20 w-40 overflow-hidden rounded-xl border border-white/10 py-1.5">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white",
                loc === locale && "text-white"
              )}
            >
              {LOCALE_LABELS[loc] ?? loc}
              {loc === locale && <Check className="h-3.5 w-3.5 text-[var(--color-glow)]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
