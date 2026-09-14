import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "peer h-14 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 pt-4 text-sm text-white placeholder-transparent outline-none transition-colors focus:border-[var(--color-accent)]/60 focus:bg-white/[0.04]",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
