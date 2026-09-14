"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProjectCard } from "@/components/sections/project-card";
import { ProjectModal } from "@/components/sections/project-modal";
import { PROJECTS } from "@/constants/data";
import { fadeUp, viewportOnce } from "@/animations/variants";
import type { Project } from "@/types";

export function Projects() {
  const t = useTranslations("projects");
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="h-full"
          >
            <ProjectCard project={project} featured={project.featured} onOpen={() => setActive(project)} />
          </motion.div>
        ))}
      </div>

      <ProjectModal project={active} onOpenChange={(open) => !open && setActive(null)} />
    </section>
  );
}
