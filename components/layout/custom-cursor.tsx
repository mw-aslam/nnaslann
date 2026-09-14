"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const ringX = useSpring(cursorX, { damping: 20, stiffness: 150, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 150, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    function handleMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest('a, button, [data-cursor="pointer"], input, textarea'));
    }
    function handleLeave() {
      setIsVisible(false);
    }

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden md:block">
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      />
      <motion.div
        className="fixed left-0 top-0 rounded-full border-2 border-[var(--color-accent)]"
        animate={{
          width: isPointer ? 56 : 32,
          height: isPointer ? 56 : 32,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isPointer ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
