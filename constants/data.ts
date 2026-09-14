import {
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiHtml5,
  SiTelegram,
  SiDiscord,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import {
  Sparkles,
  Rocket,
  Trophy,
  Award,
  Code2,
  Layers,
  Bot,
  Server,
  Palette,
  ShieldCheck,
} from "lucide-react";
import type {
  NavLink,
  SocialLink,
  Skill,
  Project,
  ExperienceItem,
  AchievementItem,
  ServiceItem,
  Certificate,
  Testimonial,
  TimelineItem,
  Stat,
} from "@/types";

export const SITE = {
  name: "Arslan Titerbayev",
  location: "Toshkent sh., Sergeli tumani",
  email: "arslantiterbayev53@gmail.com",
  githubUsername: "mw-aslam",
  telegramUsername: "nn_aslann",
  discordUsername: "nn_aslann",
  url: "https://arslan.dev",
};

export const NAV_LINKS: NavLink[] = [
  { labelKey: "about", href: "#about" },
  { labelKey: "stack", href: "#stack" },
  { labelKey: "projects", href: "#projects" },
  { labelKey: "experience", href: "#experience" },
  { labelKey: "services", href: "#services" },
  { labelKey: "github", href: "#github" },
  { labelKey: "testimonials", href: "#testimonials" },
  { labelKey: "contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: `https://github.com/${SITE.githubUsername}`, icon: SiGithub },
  { label: "Telegram", href: `https://t.me/${SITE.telegramUsername}`, icon: SiTelegram },
  { label: "Discord", href: "#", icon: SiDiscord, copyValue: SITE.discordUsername },
  { label: "Email", href: `mailto:${SITE.email}`, icon: HiOutlineMail },
];

export const STATS: Stat[] = [
  { key: "years", value: 1, suffix: "+" },
  { key: "projects", value: 20, suffix: "+" },
  { key: "tech", value: 15, suffix: "+" },
  { key: "clients", value: 10, suffix: "+" },
];

export const SKILLS: Skill[] = [
  { name: "HTML5", icon: SiHtml5, level: 98, category: "language" },
  { name: "CSS3", icon: FaCss3Alt, level: 95, category: "language" },
  { name: "JavaScript", icon: SiJavascript, level: 96, category: "language" },
  { name: "Python", icon: SiPython, level: 90, category: "language" },
  { name: "React", icon: SiReact, level: 95, category: "frontend" },
  { name: "Next.js", icon: SiNextdotjs, level: 93, category: "frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: 96, category: "frontend" },
  { name: "Node.js", icon: SiNodedotjs, level: 92, category: "backend" },
  { name: "Express", icon: SiExpress, level: 90, category: "backend" },
  { name: "Telegram Bot API", icon: SiTelegram, level: 94, category: "backend" },
  { name: "Prisma", icon: SiPrisma, level: 87, category: "backend" },
  { name: "PostgreSQL", icon: SiPostgresql, level: 88, category: "database" },
  { name: "MongoDB", icon: SiMongodb, level: 85, category: "database" },
  { name: "Docker", icon: SiDocker, level: 80, category: "tool" },
  { name: "Git", icon: SiGit, level: 95, category: "tool" },
  { name: "GitHub", icon: SiGithub, level: 95, category: "tool" },
  { name: "Linux", icon: SiLinux, level: 82, category: "tool" },
  { name: "AI APIs", icon: RiOpenaiFill, level: 90, category: "ai" },
];

export const PROJECTS: Project[] = [
  {
    id: "nexclutch",
    image: "/api/image?name=nexclutch",
    tech: ["React", "Electron", "JavaScript", "Tailwind CSS", "System Monitoring"],
    liveUrl: "https://nexclutch.netlify.app/",
    featured: true,
    year: "2026",
  },
  {
    id: "mortisai",
    image: "/images/projects/mortisai.jpg",
    tech: ["Python", "Telegram Bot API", "OpenAI API", "Whisper API"],
    liveUrl: "https://t.me/mortisai_bot",
    featured: true,
    year: "2026",
    isProtected: true,
  },
  {
    id: "noutusta",
    image: "/images/projects/noutusta.png",
    tech: ["React", "Vite", "Tailwind CSS"],
    liveUrl: "https://noutusta.uz",
    featured: true,
    year: "2026",
  },
  {
    id: "bugsense",
    image: "/images/projects/bugsense.png",
    tech: ["Python", "Telegram Bot API", "OpenAI API"],
    liveUrl: "https://t.me/BugSense_bot",
    featured: true,
    year: "2026",
    isProtected: true,
  },
  {
    id: "mwpizzashop",
    image: "/api/image?name=mwpizzashop",
    tech: ["React", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://mwpizzashop.netlify.app/",
    featured: true,
    year: "2026",
  },
  {
    id: "coddycompiler",
    image: "/api/image?name=coddycompiler",
    tech: ["JavaScript", "HTML5", "CSS3", "React"],
    liveUrl: "https://coddycompiler.netlify.app/",
    featured: true,
    year: "2026",
  },
  {
    id: "coddyinsta",
    image: "/api/image?name=coddyinsta",
    tech: ["Python", "Telegram Bot API", "Media API"],
    liveUrl: "https://t.me/CoddyInsta_bot",
    featured: true,
    year: "2026",
    isProtected: true,
  },
  {
    id: "coddyreminder",
    image: "/api/image?name=coddyreminder",
    tech: ["Python", "Telegram Bot API", "APScheduler"],
    liveUrl: "https://t.me/CoddyReminder_bot",
    featured: true,
    year: "2026",
    isProtected: true,
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Freelance / Full Stack & Bot Developer",
    companyUrl: "#",
    tech: ["JavaScript", "React", "Next.js", "Python", "Telegram Bot API"],
  },
  {
    id: "exp-2",
    company: "CoddyCamp IT Academy",
    companyUrl: "#",
    tech: ["JavaScript", "Python", "HTML5", "CSS3", "Git", "Mentoring"],
  },
];

export const TIMELINE: TimelineItem[] = [
  { id: "t1", year: "2025" },
  { id: "t2", year: "2025" },
  { id: "t3", year: "2025" },
  { id: "t4", year: "2026" },
  { id: "t5", year: "2026" },
  { id: "t6", year: "2026" },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  { id: "a1", date: "2022", icon: Trophy },
  { id: "a2", date: "2023", icon: Code2 },
  { id: "a3", date: "2024", icon: Award },
  { id: "a4", date: "2025", icon: Sparkles },
];

export const SERVICES: ServiceItem[] = [
  { id: "s1", icon: Layers },
  { id: "s2", icon: Bot },
  { id: "s3", icon: Server },
  { id: "s4", icon: Palette },
  { id: "s5", icon: Rocket },
  { id: "s6", icon: ShieldCheck },
];

export const CERTIFICATES: Certificate[] = [
  { id: "c1", date: "2022", image: "/images/certificates/cert-1.svg", credentialUrl: "#" },
  { id: "c2", date: "2023", image: "/images/certificates/cert-2.svg", credentialUrl: "#" },
  { id: "c3", date: "2024", image: "/images/certificates/cert-3.svg", credentialUrl: "#" },
  { id: "c4", date: "2024", image: "/images/certificates/cert-4.svg", credentialUrl: "#" },
  { id: "c5", date: "2023", image: "/images/certificates/cert-5.svg", credentialUrl: "#" },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "test1", name: "Sarah Whitfield", company: "Nimbus Labs", avatar: "/images/avatars/avatar-1.svg", rating: 5 },
  { id: "test2", name: "Marcus Chen", company: "Solstice Digital", avatar: "/images/avatars/avatar-2.svg", rating: 5 },
  { id: "test3", name: "Elena Rodriguez", company: "Pulse Analytics", avatar: "/images/avatars/avatar-3.svg", rating: 5 },
  { id: "test4", name: "James Okafor", company: "Nova Commerce", avatar: "/images/avatars/avatar-4.svg", rating: 5 },
];
