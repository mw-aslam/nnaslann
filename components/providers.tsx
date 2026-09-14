"use client";

import { ThemeProvider } from "next-themes";
import { useLenis } from "@/hooks/useLenis";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  );
}
