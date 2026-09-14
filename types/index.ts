import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

export interface NavLink {
  labelKey: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
  copyValue?: string;
}

export interface Skill {
  name: string;
  icon: IconType;
  level: number;
  category: "language" | "frontend" | "backend" | "database" | "tool" | "ai";
}

export interface Project {
  id: string;
  image: string;
  video?: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
  isProtected?: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl?: string;
  tech: string[];
}

export interface AchievementItem {
  id: string;
  date: string;
  icon: LucideIcon;
}

export interface ServiceItem {
  id: string;
  icon: LucideIcon;
}

export interface Certificate {
  id: string;
  date: string;
  image: string;
  credentialUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface TimelineItem {
  id: string;
  year: string;
}

export interface Stat {
  key: "years" | "projects" | "tech" | "clients";
  value: number;
  suffix?: string;
}
