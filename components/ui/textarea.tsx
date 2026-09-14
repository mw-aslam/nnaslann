import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "peer min-h-36 w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 pt-6 text-sm text-white placeholder-transparent outline-none transition-colors focus:border-[var(--color-accent)]/60 focus:bg-white/[0.04]",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
