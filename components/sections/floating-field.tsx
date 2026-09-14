"use client";

import { cn } from "@/lib/utils";

interface FloatingFieldProps {
  label: string;
  error?: string;
  children: React.ReactElement;
}

export function FloatingField({ label, error, children }: FloatingFieldProps) {
  return (
    <div className="relative">
      {children}
      <label className="pointer-events-none absolute left-4 top-4 text-sm text-white/40 transition-all duration-200 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[var(--color-glow)] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]">
        {label}
      </label>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function fieldClasses(hasError?: boolean) {
  return cn(hasError && "border-red-400/60 focus:border-red-400/60");
}
