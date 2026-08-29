/**
 * Prisma 7 CLI konfiguratsiyasi (db push / migrate / studio uchun).
 * Next.js kabi .env.local'ni ham o'qiydi.
 *
 * DATABASE_URL bo'lmasa ham `prisma generate` ishlashi kerak (xotira rejimi),
 * shuning uchun datasource faqat URL mavjud bo'lganda beriladi.
 */
import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

loadEnvConfig(process.cwd(), false, { info: () => {}, error: console.error });

const url = process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  ...(url ? { datasource: { url } } : {}),
});
