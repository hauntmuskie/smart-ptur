"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { periods, scores } from "@/db/schema";
import { periodFormSchema, scoreFormSchema } from "@/db/validation";

export type ScoreState = {
  errors?: {
    k1Score?: string[];
    k2Score?: string[];
    k3Score?: string[];
    k4Score?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function getActivePeriod() {
  const [period] = await db
    .select()
    .from(periods)
    .where(eq(periods.status, "active"))
    .limit(1);
  return period;
}

export async function upsertScore(
  employeeId: number,
  periodId: number,
  formData: FormData,
): Promise<ScoreState> {
  const validatedFields = scoreFormSchema.safeParse({
    employeeId,
    periodId,
    k1Score: formData.get("k1Score"),
    k2Score: formData.get("k2Score"),
    k3Score: formData.get("k3Score"),
    k4Score: formData.get("k4Score"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { k1Score, k2Score, k3Score, k4Score } = validatedFields.data;

  try {
    const existingScore = await db.query.scores.findFirst({
      where: and(
        eq(scores.employeeId, employeeId),
        eq(scores.periodId, periodId),
      ),
    });

    if (existingScore) {
      await db
        .update(scores)
        .set({
          k1Score,
          k2Score,
          k3Score,
          k4Score,
        })
        .where(eq(scores.id, existingScore.id));
    } else {
      await db.insert(scores).values({
        employeeId,
        periodId,
        k1Score,
        k2Score,
        k3Score,
        k4Score,
      });
    }

    revalidatePath("/pembobotan");
    return { success: true, message: "Nilai berhasil disimpan" };
  } catch (_error) {
    return { message: "Gagal menyimpan nilai" };
  }
}

export async function createPeriod(name: string, bulan: number, tahun: number) {
  const validatedFields = periodFormSchema.safeParse({
    name,
    bulan,
    tahun,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0]?.message || "Validasi gagal",
    };
  }

  try {
    await db
      .update(periods)
      .set({ status: "completed" })
      .where(eq(periods.status, "active"));

    await db.insert(periods).values({
      name: validatedFields.data.name,
      bulan: validatedFields.data.bulan,
      tahun: validatedFields.data.tahun,
      status: "active",
    });

    revalidatePath("/pembobotan");
    return { success: true, message: "Periode berhasil dibuat" };
  } catch (_error) {
    return { success: false, message: "Gagal membuat periode" };
  }
}
