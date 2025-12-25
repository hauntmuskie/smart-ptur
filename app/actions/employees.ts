"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { employees } from "@/db/schema";
import { insertEmployeeSchema } from "@/db/zodSchemas";

// Extend the base schema for form-specific validation
const EmployeeFormSchema = insertEmployeeSchema.extend({
  tanggalBergabung: z.string().optional(),
});

export type EmployeeState = {
  errors?: {
    kodeAlternatif?: string[];
    namaLengkap?: string[];
    nik?: string[];
    barcode?: string[];
    jenisKelamin?: string[];
    departemen?: string[];
    jabatan?: string[];
    tanggalBergabung?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function createEmployee(
  _prevState: EmployeeState,
  formData: FormData,
): Promise<EmployeeState> {
  const validatedFields = EmployeeFormSchema.safeParse({
    kodeAlternatif: formData.get("kodeAlternatif"),
    namaLengkap: formData.get("namaLengkap"),
    nik: formData.get("nik"),
    barcode: formData.get("barcode") || undefined,
    jenisKelamin: formData.get("jenisKelamin"),
    departemen: formData.get("departemen"),
    jabatan: formData.get("jabatan") || undefined,
    tanggalBergabung: formData.get("tanggalBergabung") || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await db.insert(employees).values({
      ...validatedFields.data,
      tanggalBergabung: validatedFields.data.tanggalBergabung
        ? new Date(validatedFields.data.tanggalBergabung)
        : null,
    });

    revalidatePath("/karyawan");
    return { success: true, message: "Karyawan berhasil ditambahkan" };
  } catch (_error) {
    return {
      message: "Gagal menambahkan karyawan. NIK atau Kode mungkin sudah ada.",
    };
  }
}

export async function updateEmployee(
  id: number,
  _prevState: EmployeeState,
  formData: FormData,
): Promise<EmployeeState> {
  const validatedFields = EmployeeFormSchema.safeParse({
    kodeAlternatif: formData.get("kodeAlternatif"),
    namaLengkap: formData.get("namaLengkap"),
    nik: formData.get("nik"),
    barcode: formData.get("barcode") || undefined,
    jenisKelamin: formData.get("jenisKelamin"),
    departemen: formData.get("departemen"),
    jabatan: formData.get("jabatan") || undefined,
    tanggalBergabung: formData.get("tanggalBergabung") || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await db
      .update(employees)
      .set({
        ...validatedFields.data,
        tanggalBergabung: validatedFields.data.tanggalBergabung
          ? new Date(validatedFields.data.tanggalBergabung)
          : null,
      })
      .where(eq(employees.id, id));

    revalidatePath("/karyawan");
    return { success: true, message: "Karyawan berhasil diperbarui" };
  } catch (_error) {
    return { message: "Gagal memperbarui karyawan" };
  }
}

export async function deleteEmployee(id: number) {
  try {
    await db.delete(employees).where(eq(employees.id, id));
    revalidatePath("/karyawan");
    return { success: true, message: "Karyawan berhasil dihapus" };
  } catch (_error) {
    return { success: false, message: "Gagal menghapus karyawan" };
  }
}
