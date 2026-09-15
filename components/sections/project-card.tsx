"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
  featured?: boolean;
}

export function ProjectCard({ project, onOpen, featured }: ProjectCardProps) {
  const t = useTranslations("projects");
  const tags = t.raw(`items.${project.id}.tags`) as string[];
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState(project.image);

  useEffect(() => {
    setImgSrc(project.image);
  }, [project.image]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  }

  return (
    <Card
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onOpen}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="group relative cursor-pointer overflow-hidden transition-transform duration-200 ease-out will-change-transform h-full flex flex-col justify-between"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-[#0b0b0b]">
        <Image
          src={imgSrc}
          alt={t(`items.${project.id}.title`)}
          fill
          unoptimized
          onError={() => {
            if (imgSrc.includes("/api/image")) {
              setImgSrc(`/images/projects/${project.id}.jpg`);
            }
          }}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {project.featured && (
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
            {t("featured")}
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] text-white/80 backdrop-blur-sm">
          {project.year}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-center p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-black">
            {t("viewDetails")} <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-white">{t(`items.${project.id}.title`)}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/50">
            {t(`items.${project.id}.description`)}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/35">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </Card>
  );
}
