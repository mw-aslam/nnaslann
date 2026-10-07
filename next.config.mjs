import { fileURLToPath } from "url";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Build-time sync for project images
try {
  const projDir = path.join(__dirname, "public", "images", "projects");
  if (!fs.existsSync(projDir)) fs.mkdirSync(projDir, { recursive: true });

  const src7pc = "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1791362887913.png";
  if (fs.existsSync(src7pc)) {
    fs.copyFileSync(src7pc, path.join(projDir, "7pc.jpg"));
    fs.copyFileSync(src7pc, path.join(projDir, "7pc.png"));
  }

  const srcElClasico = "C:/Users/user/.gemini/antigravity/brain/a70e3abf-aff6-4fb2-ad2b-a82872078b37/.user_uploaded/media_1791363043788.png";
  if (fs.existsSync(srcElClasico)) {
    fs.copyFileSync(srcElClasico, path.join(projDir, "elclasico.png"));
    fs.copyFileSync(srcElClasico, path.join(projDir, "elclasico.jpg"));
  }
} catch (e) {
  console.error("Asset sync error:", e);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
