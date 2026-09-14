"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function useLenis() {
  useEffect(() => {
    // Disable Lenis on mobile touch devices for 60fps native GPU touch scroll
    if (typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window)) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
