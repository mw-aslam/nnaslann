"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, GitFork, Users, BookMarked } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { SITE } from "@/constants/data";
import { fadeUp, viewportOnce } from "@/animations/variants";

interface GithubProfile {
  public_repos: number;
  followers: number;
  html_url: string;
}

interface GithubRepo {
  stargazers_count: number;
  forks_count: number;
}

export function GithubStats() {
  const t = useTranslations("github");
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [totalStars, setTotalStars] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const username = SITE.githubUsername;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
        ]);
        if (!profileRes.ok || !reposRes.ok) throw new Error("GitHub API request failed");
        const profileData: GithubProfile = await profileRes.json();
        const reposData: GithubRepo[] = await reposRes.json();
        if (cancelled) return;
        setProfile(profileData);
        setTotalStars(reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0));
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const metrics = [
    { label: t("metrics.repos"), value: profile?.public_repos, icon: BookMarked },
    { label: t("metrics.stars"), value: totalStars ?? undefined, icon: Star },
    { label: t("metrics.followers"), value: profile?.followers, icon: Users },
    { label: t("metrics.forks"), value: undefined, icon: GitFork },
  ];

  return (
    <section id="github" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      {status === "error" ? (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16"
        >
          <Card className="glow-border mx-auto max-w-xl p-10 text-center">
            <p className="text-white/60">
              {t.rich("connectMessage", {
                code: (chunks) => (
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">{chunks}</code>
                ),
              })}
            </p>
          </Card>
        </motion.div>
      ) : (
        <>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <Card className="glow-border flex flex-col gap-3 p-6">
                  <metric.icon className="h-5 w-5 text-[var(--color-glow)]" />
                  <span className="text-3xl font-semibold text-white">
                    {status === "loading" ? (
                      <span className="inline-block h-8 w-16 animate-pulse rounded bg-white/10" />
                    ) : (
                      (metric.value ?? "—").toString()
                    )}
                  </span>
                  <span className="text-sm text-white/45">{metric.label}</span>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-8"
          >
            <Card className="glow-border overflow-x-auto p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ghchart.rshah.org/d4d4d8/${username}`}
                alt={`${username} GitHub contribution graph`}
                className="min-w-[720px] w-full"
                loading="lazy"
              />
            </Card>
          </motion.div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <Card className="glow-border overflow-hidden p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=ffffff&text_color=8a8a8f&icon_color=d4d4d8&bg_color=00000000`}
                  alt="GitHub stats summary"
                  className="w-full"
                  loading="lazy"
                />
              </Card>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Card className="glow-border overflow-hidden p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=ffffff&text_color=8a8a8f&bg_color=00000000`}
                  alt="Most used languages"
                  className="w-full"
                  loading="lazy"
                />
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}
