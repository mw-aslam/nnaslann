"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-white text-black hover:bg-white/85",
        accent: "bg-[var(--color-accent)] text-black hover:bg-white/85",
        outline:
          "border border-white/15 text-white hover:border-white/40 hover:bg-white/5 backdrop-blur-sm",
        ghost: "text-white/70 hover:text-white hover:bg-white/5",
        link: "text-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-9 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
