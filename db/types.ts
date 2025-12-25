import type * as schema from "./schema";

export type DBSchema = typeof schema;

export type MySQLDatabase = ReturnType<
  typeof import("./drivers/mysql").createMySQLConnection
>;
export type TiDBDatabase = ReturnType<
  typeof import("./drivers/tidb").createTiDBConnection
>;
export type Database = MySQLDatabase;
