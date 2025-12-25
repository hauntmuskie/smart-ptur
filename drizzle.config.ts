import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const driver = process.env.DB_DRIVER ?? "mysql";
const isProduction = process.env.NODE_ENV === "production" || driver === "tidb";

export default defineConfig({
  dialect: "mysql",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
    ...(isProduction && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  },
});
