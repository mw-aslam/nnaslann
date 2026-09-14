import { fileURLToPath } from "url";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default withNextIntl(nextConfig);
