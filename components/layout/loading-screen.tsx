"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 18 + 6);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            document.body.style.overflow = "";
          }, 350);
        }
        return next;
      });
    }, 140);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-[#050505]"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-grid absolute inset-0" />
          <div className="relative flex flex-col items-center gap-6">
            <span className="text-4xl font-semibold tracking-tight shimmer-text">Arslan</span>
            <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-glow)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="font-mono text-xs tracking-widest text-white/40">
              {Math.floor(progress)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
