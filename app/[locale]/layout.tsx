import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "../globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { routing } from "@/i18n/routing";
import { SITE } from "@/constants/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: t("title"),
      template: `%s — ${SITE.name}`,
    },
    description: t("description"),
    keywords: [
      "Arslan Titerbayev",
      "Arslan",
      "mw-aslam",
      "nn_aslann",
      "Full Stack Developer Tashkent",
      "Telegram Bot Developer Uzbekistan",
      "React Developer Tashkent",
      "Next.js Developer",
      "CoddyCamp IT Academy",
      "NEXCLUTCH",
      "NoutUsta",
      "BugSense",
      "MortisAI",
      "CoddyCompiler",
      "Pizza Shop",
    ],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    openGraph: {
      type: "website",
      url: SITE.url,
      title: t("title"),
      description: t("description"),
      siteName: SITE.name,
      images: [{ url: "/images/og-image.svg", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/og-image.svg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

import { AnimatedGlobalBackground } from "@/components/layout/animated-background";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Arslan Titerbayev",
    "alternateName": ["Arslan", "mw-aslam", "nn_aslann"],
    "url": SITE.url,
    "image": `${SITE.url}/images/profile.jpg`,
    "jobTitle": "Junior Full-Stack Developer & Telegram Bot Developer",
    "worksFor": [
      {
        "@type": "Organization",
        "name": "CoddyCamp IT Academy (Support Teacher)"
      },
      {
        "@type": "Organization",
        "name": "Freelance Full-Stack Developer"
      }
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "CoddyCamp IT Academy",
      "department": "Full-Stack Software Development"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tashkent",
      "addressRegion": "Sergeli",
      "addressCountry": "Uzbekistan"
    },
    "email": SITE.email,
    "sameAs": [
      `https://github.com/${SITE.githubUsername}`,
      `https://t.me/${SITE.telegramUsername}`
    ],
    "knowsAbout": [
      "JavaScript (ES6+)",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Python",
      "Telegram Bot API",
      "REST API Architecture",
      "MongoDB",
      "PostgreSQL",
      "Tailwind CSS",
      "Vite",
      "Git & GitHub"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full-Stack & Bot Developer",
      "occupationLocation": {
        "@type": "City",
        "name": "Tashkent"
      },
      "skills": "Full-Stack Web Development, Telegram Bot Engineering, REST API Design, System Optimization"
    },
    "description": "Arslan Titerbayev — Full-Stack & Telegram Bot Developer based in Tashkent, Sergeli. Specializing in high-performance web applications (React, Next.js), smart Telegram bots (Python), and REST API architecture. Former Support Teacher at CoddyCamp IT Academy. Built 20+ real projects including NEXCLUTCH, NoutUsta, BugSense, MortisAI, and CoddyCompiler."
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <LoadingScreen />
            <CustomCursor />
            <AnimatedGlobalBackground />
            <div className="noise" />
            <Navbar />
            <main className="relative z-[3]">{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
