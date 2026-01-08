"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { scores } from "@/db/schema";
import { scoreFormSchema } from "@/db/validation";

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

export async function upsertScore(
  employeeId: number,
  formData: FormData,
): Promise<ScoreState> {
  const validatedFields = scoreFormSchema.safeParse({
    employeeId,
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
      where: eq(scores.employeeId, employeeId),
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
