import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// .env.local (if present) wins over .env, matching how Next.js loads them.
config({ path: [".env.local", ".env"], quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node --import tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
