import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import {
  criteria,
  employeeActivities,
  employees,
  scores,
  users,
} from "./schema";

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

export const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const insertEmployeeSchema = createInsertSchema(employees, {
  kodeAlternatif: z.string().min(1, "Kode alternatif wajib diisi"),
  namaLengkap: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  nik: z.string().min(1, "NIK wajib diisi"),
  departemen: z.string().min(1, "Departemen wajib diisi"),
});
export const selectEmployeeSchema = createSelectSchema(employees);

export const employeeFormSchema = insertEmployeeSchema
  .omit({ kodeAlternatif: true })
  .extend({
    kodeAlternatif: z.string().optional(),
    tanggalBergabung: z.string().optional(),
  });

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type SelectEmployee = z.infer<typeof selectEmployeeSchema>;

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

export const criteriaFormSchema = z.object({
  kode: z.string().min(1, "Kode kriteria wajib diisi"),
  nama: z.string().min(1, "Nama kriteria wajib diisi"),
  bobot: z.string().min(1, "Bobot wajib diisi"),
  keterangan: z.string().optional(),
});

export type InsertCriteria = z.infer<typeof insertCriteriaSchema>;
export type SelectCriteria = z.infer<typeof selectCriteriaSchema>;

export const insertScoreSchema = createInsertSchema(scores, {
  k1Score: z.string().optional(),
  k2Score: z.string().optional(),
  k3Score: z.string().optional(),
  k4Score: z.string().optional(),
  k5Score: z.string().optional(),
});
export const selectScoreSchema = createSelectSchema(scores);

export const scoreFormSchema = z.object({
  employeeId: z.number(),
  k1Score: z.string().min(1, "Nilai K1 wajib diisi"),
  k2Score: z.string().min(1, "Nilai K2 wajib diisi"),
  k3Score: z.string().min(1, "Nilai K3 wajib diisi"),
  k4Score: z.string().min(1, "Nilai K4 wajib diisi"),
  k5Score: z.string().min(1, "Nilai K5 wajib diisi"),
});

export type InsertScore = z.infer<typeof insertScoreSchema>;
export type SelectScore = z.infer<typeof selectScoreSchema>;

export const insertEmployeeActivitySchema = createInsertSchema(
  employeeActivities,
  {
    tanggal: z.date(),
    jamMasuk: z.string().optional(),
    jamPulang: z.string().optional(),
  },
);
export const selectEmployeeActivitySchema =
  createSelectSchema(employeeActivities);

export type InsertEmployeeActivity = z.infer<
  typeof insertEmployeeActivitySchema
>;
export type SelectEmployeeActivity = z.infer<
  typeof selectEmployeeActivitySchema
>;
