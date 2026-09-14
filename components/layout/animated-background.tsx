"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticleField = dynamic(
  () => import("@/components/three/particle-field").then((m) => m.ParticleField),
  { ssr: false }
);

export function AnimatedGlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* Interactive 3D Scroll Code Matrix Field (Desktop Only) */}
      <ParticleField />

      {/* Animated subtle grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.22]" />

      {/* Floating Animated Monochrome Glow Orbs (Desktop Only for 60fps mobile speed) */}
      <div className="hidden md:block">
        {/* Glow Orb 1 */}
        <motion.div
          animate={{
            x: [0, 70, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-white/10 via-zinc-400/5 to-transparent blur-[120px]"
        />

        {/* Glow Orb 2 */}
        <motion.div
          animate={{
            x: [0, -80, 50, 0],
            y: [0, 70, -50, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-[35%] h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-white/8 via-zinc-300/5 to-transparent blur-[140px]"
        />

        {/* Glow Orb 3 */}
        <motion.div
          animate={{
            x: [0, 60, -50, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.25, 0.85, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-20 bottom-10 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-white/10 via-zinc-400/5 to-transparent blur-[130px]"
        />
      </div>

      {/* Static lightweight background glow for Mobile Devices (Zero GPU lag) */}
      <div className="block md:hidden absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)]" />

      {/* Subtle Radial Vignette Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,#050505_100%)] opacity-70" />
    </div>
  );
}
