"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Code2 } from "lucide-react";

export function HeroAvatar() {
  const [imgSrc, setImgSrc] = useState("/api/image?name=profile&v=final");

  return (
    <div className="relative mx-auto my-4 flex items-center justify-center max-w-full px-2 sm:my-6">
      {/* Outer Glow Halo */}
      <div className="absolute -inset-6 -z-10 rounded-[140px] bg-gradient-to-b from-white/15 via-white/5 to-transparent blur-3xl sm:-inset-8 sm:rounded-[160px]" />

      {/* Main Dome Arch Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-64 w-56 flex-col items-center justify-end overflow-hidden rounded-b-3xl rounded-t-[110px] border border-white/30 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black shadow-[0_25px_60px_rgba(0,0,0,0.9)] sm:h-84 sm:w-76 sm:rounded-t-[160px]"
      >
        {/* Profile Image Container with Silver-Gray Studio Backlight */}
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-zinc-500/50 via-zinc-800/90 to-[#121215]">
          {/* Radial Studio Backlight behind Head & Shoulders */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.4),transparent_65%)]" />

          <Image
            src={imgSrc}
            alt="Arslan Titerbayev"
            fill
            quality={100}
            unoptimized
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 450px"
            onError={() => {
              if (imgSrc.includes("/api/image")) setImgSrc("/images/profile.png");
              else if (imgSrc.endsWith(".png")) setImgSrc("/images/profile.jpg");
              else if (imgSrc.endsWith(".jpg")) setImgSrc("/images/profile.svg");
            }}
            className="object-cover object-top transition-transform duration-700 hover:scale-105 filter brightness-[1.06] contrast-[1.12]"
            priority
          />
          {/* Soft Bottom Gradient Vignette */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      </motion.div>

      {/* Rotating Circular Text Badge (Top-Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute right-0 top-0 z-30 sm:-right-8 sm:-top-8"
      >
        <div className="relative flex h-20 w-20 items-center justify-center sm:h-32 sm:w-32">
          {/* Spinning Curved Text */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[9px] font-semibold uppercase tracking-[0.24em] fill-white/80">
                <textPath href="#circlePath" startOffset="0%">
                  ARSLAN TITERBAYEV ★ FULL-STACK DEVELOPER ★
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Inner Badge Pill */}
          <div className="relative flex h-10 w-10 flex-col items-center justify-center rounded-full border border-white/20 bg-black/85 p-1 text-center shadow-lg backdrop-blur-md sm:h-16 sm:w-16 sm:p-2">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 mb-0.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white shadow-[0_0_8px_white]" />
            </span>
            <span className="text-[6px] sm:text-[8px] font-bold uppercase tracking-wider text-white leading-tight">
              Open For Hire
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Code Card Accent (Top-Left Background) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute -left-10 -top-6 z-20 hidden items-center gap-2.5 rounded-2xl border border-white/15 bg-black/80 px-3.5 py-2.5 shadow-2xl backdrop-blur-xl md:flex"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white">
          <Code2 className="h-4 w-4" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-semibold text-white">React 19 & Next.js</span>
          <span className="text-[9px] text-white/50">Full-Stack Architecture</span>
        </div>
      </motion.div>

      {/* Floating Tech Badge 1 (Bottom Left - Safe mobile fit) */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1 bottom-4 z-30 sm:-left-12 sm:bottom-12"
      >
        <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/90 px-2 py-0.5 sm:px-4 sm:py-2 shadow-xl backdrop-blur-md">
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white shadow-[0_0_8px_white]" />
          <span className="font-mono text-[9px] sm:text-xs font-medium text-white/90">
            Node.js • Express • DB
          </span>
        </div>
      </motion.div>

      {/* Floating Tech Badge 2 (Bottom Right - Safe mobile fit) */}
      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-1 -bottom-4 z-30 sm:-right-10 sm:bottom-4"
      >
        <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/90 px-2 py-0.5 sm:px-4 sm:py-2 shadow-xl backdrop-blur-md">
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white shadow-[0_0_8px_white]" />
          <span className="font-mono text-[9px] sm:text-xs font-medium text-white/90">
            React • Next.js • Python
          </span>
        </div>
      </motion.div>
    </div>
  );
}
