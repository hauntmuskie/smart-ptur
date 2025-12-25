import { relations } from "drizzle-orm";
import {
  date,
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  role: mysqlEnum("role", ["admin", "employee"]).notNull().default("employee"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const employees = mysqlTable("employees", {
  id: int("id").primaryKey().autoincrement(),
  kodeAlternatif: varchar("kode_alternatif", { length: 10 }).notNull().unique(),
  namaLengkap: varchar("nama_lengkap", { length: 100 }).notNull(),
  nik: varchar("nik", { length: 50 }).notNull().unique(),
  barcode: varchar("barcode", { length: 50 }),
  jenisKelamin: mysqlEnum("jenis_kelamin", ["L", "P"]).notNull(),
  departemen: varchar("departemen", { length: 100 }).notNull(),
  jabatan: varchar("jabatan", { length: 100 }),
  tanggalBergabung: date("tanggal_bergabung"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const criteria = mysqlTable("criteria", {
  id: int("id").primaryKey().autoincrement(),
  kode: varchar("kode", { length: 10 }).notNull().unique(),
  nama: varchar("nama", { length: 100 }).notNull(),
  bobot: decimal("bobot", { precision: 5, scale: 2 }).notNull(),
  normalisasiBobot: decimal("normalisasi_bobot", { precision: 5, scale: 4 }),
  keterangan: text("keterangan"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const periods = mysqlTable("periods", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull(),
  bulan: int("bulan").notNull(),
  tahun: int("tahun").notNull(),
  status: mysqlEnum("status", ["active", "completed", "draft"])
    .notNull()
    .default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const employeeActivities = mysqlTable("employee_activities", {
  id: int("id").primaryKey().autoincrement(),
  employeeId: int("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  tanggal: date("tanggal").notNull(),
  jamMasuk: time("jam_masuk"),
  jamPulang: time("jam_pulang"),
  keterangan: mysqlEnum("keterangan", [
    "hadir",
    "izin",
    "sakit",
    "alpha",
    "cuti",
  ]).default("hadir"),
  target: mysqlEnum("target", ["tercapai", "tidak_tercapai"]).default(
    "tercapai",
  ),
  createdAt: timestamp("created_at").defaultNow(),
});

export const scores = mysqlTable("scores", {
  id: int("id").primaryKey().autoincrement(),
  employeeId: int("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  periodId: int("period_id")
    .notNull()
    .references(() => periods.id, { onDelete: "cascade" }),
  k1Score: decimal("k1_score", { precision: 5, scale: 2 }),
  k2Score: decimal("k2_score", { precision: 5, scale: 2 }),
  k3Score: decimal("k3_score", { precision: 5, scale: 2 }),
  k4Score: decimal("k4_score", { precision: 5, scale: 2 }),
  k1Normalized: decimal("k1_normalized", { precision: 5, scale: 4 }),
  k2Normalized: decimal("k2_normalized", { precision: 5, scale: 4 }),
  k3Normalized: decimal("k3_normalized", { precision: 5, scale: 4 }),
  k4Normalized: decimal("k4_normalized", { precision: 5, scale: 4 }),
  totalScore: decimal("total_score", { precision: 5, scale: 4 }),
  ranking: int("ranking"),
  grade: mysqlEnum("grade", ["sangat_baik", "baik", "kurang"]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const employeesRelations = relations(employees, ({ many }) => ({
  activities: many(employeeActivities),
  scores: many(scores),
}));

export const employeeActivitiesRelations = relations(
  employeeActivities,
  ({ one }) => ({
    employee: one(employees, {
      fields: [employeeActivities.employeeId],
      references: [employees.id],
    }),
  }),
);

export const scoresRelations = relations(scores, ({ one }) => ({
  employee: one(employees, {
    fields: [scores.employeeId],
    references: [employees.id],
  }),
  period: one(periods, {
    fields: [scores.periodId],
    references: [periods.id],
  }),
}));

export const periodsRelations = relations(periods, ({ many }) => ({
  scores: many(scores),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;
export type Criteria = typeof criteria.$inferSelect;
export type NewCriteria = typeof criteria.$inferInsert;
export type Period = typeof periods.$inferSelect;
export type NewPeriod = typeof periods.$inferInsert;
export type EmployeeActivity = typeof employeeActivities.$inferSelect;
export type NewEmployeeActivity = typeof employeeActivities.$inferInsert;
export type Score = typeof scores.$inferSelect;
export type NewScore = typeof scores.$inferInsert;
