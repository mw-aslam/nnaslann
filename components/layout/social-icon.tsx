"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { SocialLink } from "@/types";
import { cn } from "@/lib/utils";

const baseClasses =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-colors hover:border-[var(--color-accent)]/50 hover:text-white";

export function SocialIcon({ social, className }: { social: SocialLink; className?: string }) {
  const [copied, setCopied] = useState(false);

  if (social.copyValue) {
    return (
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(social.copyValue!);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        }}
        aria-label={`Copy ${social.label} username`}
        title={copied ? "Copied!" : `${social.label}: ${social.copyValue}`}
        className={cn(baseClasses, className)}
      >
        {copied ? <Check className="h-4 w-4" /> : <social.icon className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <a
      href={social.href}
      target={social.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={social.label}
      title={social.label}
      className={cn(baseClasses, className)}
    >
      <social.icon className="h-4 w-4" />
    </a>
  );
}
