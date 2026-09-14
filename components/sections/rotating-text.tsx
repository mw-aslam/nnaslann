"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function RotatingText({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-flex h-8 sm:h-12 min-w-[200px] sm:min-w-[340px] items-center justify-center text-center overflow-hidden align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center text-center text-white font-semibold whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
