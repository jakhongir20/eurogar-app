import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      /* YouTube video otzivlar thumbnail'lari */
      { protocol: "https", hostname: "i.ytimg.com" },
      /* Vercel Blob'dagi mahsulot rasmlari */
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default withNextIntl(nextConfig);
