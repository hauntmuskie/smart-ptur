import { createMySQLConnection } from "./drivers/mysql";
import { createTiDBConnection } from "./drivers/tidb";
import type { Database } from "./types";

export type { Database, MySQLDatabase, TiDBDatabase } from "./types";

type DBDriver = "mysql" | "tidb";

function getDBDriver(): DBDriver {
  const driver = process.env.DB_DRIVER as DBDriver | undefined;
  if (driver === "mysql" || driver === "tidb") {
    return driver;
  }
  return process.env.NODE_ENV === "production" ? "tidb" : "mysql";
}

function createDatabaseConnection(): Database {
  const driver = getDBDriver();

  switch (driver) {
    case "mysql":
      return createMySQLConnection();
    case "tidb":
      return createTiDBConnection() as unknown as Database;
    default:
      throw new Error(`Unsupported database driver: ${driver}`);
  }
}

export const db = createDatabaseConnection();
