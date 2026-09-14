"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Github, ShieldAlert, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLenis } from "@/hooks/useLenis";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, onOpenChange }: ProjectModalProps) {
  const t = useTranslations("projects");
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (project) {
      lenis.stop();
    } else {
      lenis.start();
    }
    return () => {
      lenis.start();
    };
  }, [project]);

  useEffect(() => {
    if (!project) {
      setShowNotice(false);
    }
  }, [project]);

  const handleDemoClick = (e: React.MouseEvent) => {
    if (project?.isProtected) {
      e.preventDefault();
      setShowNotice(true);
    }
  };

  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent>
        {project && (
          <>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl bg-[#0b0b0b]">
              <Image
                src={project.image}
                alt={t(`items.${project.id}.title`)}
                fill
                className="object-contain"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0b] to-transparent" />
            </div>
            <div className="p-8">
              <div className="mb-3 flex flex-wrap gap-2">
                {(t.raw(`items.${project.id}.tags`) as string[]).map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
              <DialogTitle>{t(`items.${project.id}.title`)}</DialogTitle>
              <DialogDescription className="mt-4 text-base leading-relaxed text-white/60">
                {t(`items.${project.id}.longDescription`)}
              </DialogDescription>

              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-wider text-white/40">
                  {t("techStackLabel")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {showNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200 shadow-lg backdrop-blur-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                        <div>
                          <p className="font-semibold text-amber-300 text-sm">
                            {t("copyrightNoticeTitle")}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-amber-200/80">
                            {t("copyrightNotice")}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowNotice(false)}
                        className="rounded-lg p-1 text-amber-300/70 hover:bg-amber-500/20 hover:text-amber-200 transition-colors"
                        aria-label="Close"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  project.isProtected ? (
                    <Button variant="accent" onClick={handleDemoClick}>
                      {t("liveDemo")} <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="accent" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        {t("liveDemo")} <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  )
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" /> {t("sourceCode")}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
