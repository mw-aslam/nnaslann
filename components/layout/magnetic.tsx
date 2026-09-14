"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useMagnetic<HTMLDivElement>(strength);
  return (
    <div ref={ref} className={cn("transition-transform duration-200 ease-out", className)}>
      {children}
    </div>
  );
}
