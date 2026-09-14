import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "uz"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
