"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { employees } from "@/db/schema";
import { employeeFormSchema } from "@/db/validation";

export type EmployeeState = {
  errors?: {
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

async function generateNextKode(): Promise<string> {
  const [lastEmployee] = await db
    .select({ kodeAlternatif: employees.kodeAlternatif })
    .from(employees)
    .orderBy(desc(employees.id))
    .limit(1);

  if (!lastEmployee) {
    return "A1";
  }

  const match = lastEmployee.kodeAlternatif.match(/^A(\d+)$/);
  if (match) {
    const nextNum = Number.parseInt(match[1], 10) + 1;
    return `A${nextNum}`;
  }

  const allEmployees = await db
    .select({ kodeAlternatif: employees.kodeAlternatif })
    .from(employees);
  return `A${allEmployees.length + 1}`;
}

export async function createEmployee(
  _prevState: EmployeeState,
  formData: FormData,
): Promise<EmployeeState> {
  const validatedFields = employeeFormSchema.safeParse({
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
    const kodeAlternatif = await generateNextKode();

    await db.insert(employees).values({
      kodeAlternatif,
      ...validatedFields.data,
      tanggalBergabung: validatedFields.data.tanggalBergabung
        ? new Date(validatedFields.data.tanggalBergabung)
        : null,
    });

    revalidatePath("/karyawan");
    return { success: true, message: "Karyawan berhasil ditambahkan" };
  } catch (_error) {
    return {
      message: "Gagal menambahkan karyawan. NIK mungkin sudah ada.",
    };
  }
}

export async function updateEmployee(
  id: number,
  _prevState: EmployeeState,
  formData: FormData,
): Promise<EmployeeState> {
  const validatedFields = employeeFormSchema.safeParse({
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
