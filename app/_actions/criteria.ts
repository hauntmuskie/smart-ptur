"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { criteria } from "@/db/schema";
import { criteriaFormSchema } from "@/db/validation";

export type CriteriaState = {
  errors?: {
    kode?: string[];
    nama?: string[];
    bobot?: string[];
    keterangan?: string[];
  };
  message?: string;
  success?: boolean;
};

async function recalculateNormalization() {
  const allCriteria = await db.select().from(criteria);
  const totalBobot = allCriteria.reduce(
    (sum, c) => sum + parseFloat(c.bobot || "0"),
    0,
  );

  for (const c of allCriteria) {
    const normalisasi =
      totalBobot > 0
        ? (parseFloat(c.bobot || "0") / totalBobot).toFixed(4)
        : "0";
    await db
      .update(criteria)
      .set({ normalisasiBobot: normalisasi })
      .where(eq(criteria.id, c.id));
  }
}

export async function createCriteria(
  _prevState: CriteriaState,
  formData: FormData,
): Promise<CriteriaState> {
  const validatedFields = criteriaFormSchema.safeParse({
    kode: formData.get("kode"),
    nama: formData.get("nama"),
    bobot: formData.get("bobot"),
    keterangan: formData.get("keterangan") || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await db.insert(criteria).values({
      ...validatedFields.data,
      normalisasiBobot: "0",
    });

    await recalculateNormalization();

    revalidatePath("/kriteria");
    return { success: true, message: "Kriteria berhasil ditambahkan" };
  } catch (_error) {
    return { message: "Gagal menambahkan kriteria. Kode mungkin sudah ada." };
  }
}

export async function updateCriteria(
  id: number,
  _prevState: CriteriaState,
  formData: FormData,
): Promise<CriteriaState> {
  const validatedFields = criteriaFormSchema.safeParse({
    kode: formData.get("kode"),
    nama: formData.get("nama"),
    bobot: formData.get("bobot"),
    keterangan: formData.get("keterangan") || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await db
      .update(criteria)
      .set(validatedFields.data)
      .where(eq(criteria.id, id));

    await recalculateNormalization();

    revalidatePath("/kriteria");
    return { success: true, message: "Kriteria berhasil diperbarui" };
  } catch (_error) {
    return { message: "Gagal memperbarui kriteria" };
  }
}

export async function deleteCriteria(id: number) {
  try {
    await db.delete(criteria).where(eq(criteria.id, id));
    await recalculateNormalization();
    revalidatePath("/kriteria");
    return { success: true, message: "Kriteria berhasil dihapus" };
  } catch (_error) {
    return { success: false, message: "Gagal menghapus kriteria" };
  }
}
