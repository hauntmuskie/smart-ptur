import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { criteria, employees, periods, scores, users } from "./schema";

// User schemas
export const insertUserSchema = createInsertSchema(users, {
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(50, "Username maksimal 50 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
});
export const selectUserSchema = createSelectSchema(users);
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SelectUser = z.infer<typeof selectUserSchema>;

// Employee schemas
export const insertEmployeeSchema = createInsertSchema(employees, {
  kodeAlternatif: z.string().min(1, "Kode alternatif wajib diisi"),
  namaLengkap: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  nik: z.string().min(1, "NIK wajib diisi"),
  departemen: z.string().min(1, "Departemen wajib diisi"),
});
export const selectEmployeeSchema = createSelectSchema(employees);
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type SelectEmployee = z.infer<typeof selectEmployeeSchema>;

// Criteria schemas
export const insertCriteriaSchema = createInsertSchema(criteria, {
  kode: z.string().min(1, "Kode kriteria wajib diisi"),
  nama: z.string().min(2, "Nama kriteria minimal 2 karakter"),
  bobot: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !Number.isNaN(num) && num > 0 && num <= 100;
    },
    { message: "Bobot harus angka antara 0 dan 100" },
  ),
});
export const selectCriteriaSchema = createSelectSchema(criteria);
export type InsertCriteria = z.infer<typeof insertCriteriaSchema>;
export type SelectCriteria = z.infer<typeof selectCriteriaSchema>;

// Period schemas
export const insertPeriodSchema = createInsertSchema(periods, {
  name: z.string().min(1, "Nama period wajib diisi"),
  bulan: z.number().min(1).max(12, "Bulan harus antara 1-12"),
  tahun: z.number().min(2000).max(2100, "Tahun tidak valid"),
});
export const selectPeriodSchema = createSelectSchema(periods);
export type InsertPeriod = z.infer<typeof insertPeriodSchema>;
export type SelectPeriod = z.infer<typeof selectPeriodSchema>;

// Score schemas
export const insertScoreSchema = createInsertSchema(scores, {
  k1Score: z.string().optional(),
  k2Score: z.string().optional(),
  k3Score: z.string().optional(),
  k4Score: z.string().optional(),
});
export const selectScoreSchema = createSelectSchema(scores);
export type InsertScore = z.infer<typeof insertScoreSchema>;
export type SelectScore = z.infer<typeof selectScoreSchema>;
