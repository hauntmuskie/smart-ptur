"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { criteria, scores } from "@/db/schema";

export async function runSMARTCalculation(periodId: number) {
  try {
    const scoreList = await db
      .select()
      .from(scores)
      .where(eq(scores.periodId, periodId));

    if (scoreList.length === 0) {
      return { success: false, message: "Tidak ada data nilai untuk diproses" };
    }

    const criteriaList = await db
      .select()
      .from(criteria)
      .orderBy(criteria.kode);

    if (criteriaList.length === 0) {
      return {
        success: false,
        message: "Tidak ada kriteria yang didefinisikan",
      };
    }

    const normalizedWeights = criteriaList.map((c) => ({
      kode: c.kode,
      weight: Number.parseFloat(c.normalisasiBobot || "0"),
    }));

    for (const score of scoreList) {
      const k1Score = Number.parseFloat(score.k1Score || "0");
      const k2Score = Number.parseFloat(score.k2Score || "0");
      const k3Score = Number.parseFloat(score.k3Score || "0");
      const k4Score = Number.parseFloat(score.k4Score || "0");
      const k5Score = Number.parseFloat(score.k5Score || "0");

      const k1Utility = (k1Score / 100) * 100;
      const k2Utility = (k2Score / 100) * 100;
      const k3Utility = (k3Score / 100) * 100;
      const k4Utility = (k4Score / 100) * 100;
      const k5Utility = (k5Score / 100) * 100;

      const w1 = normalizedWeights.find((w) => w.kode === "K1")?.weight || 0;
      const w2 = normalizedWeights.find((w) => w.kode === "K2")?.weight || 0;
      const w3 = normalizedWeights.find((w) => w.kode === "K3")?.weight || 0;
      const w4 = normalizedWeights.find((w) => w.kode === "K4")?.weight || 0;
      const w5 = normalizedWeights.find((w) => w.kode === "K5")?.weight || 0;

      const totalScore =
        w1 * k1Utility +
        w2 * k2Utility +
        w3 * k3Utility +
        w4 * k4Utility +
        w5 * k5Utility;

      let grade: "sangat_baik" | "baik" | "cukup" | "buruk";
      if (totalScore >= 90) {
        grade = "sangat_baik";
      } else if (totalScore >= 80) {
        grade = "baik";
      } else if (totalScore >= 66) {
        grade = "cukup";
      } else {
        grade = "buruk";
      }

      await db
        .update(scores)
        .set({
          k1Utility: k1Utility.toFixed(2),
          k2Utility: k2Utility.toFixed(2),
          k3Utility: k3Utility.toFixed(2),
          k4Utility: k4Utility.toFixed(2),
          k5Utility: k5Utility.toFixed(2),
          totalScore: totalScore.toFixed(2),
          grade,
        })
        .where(eq(scores.id, score.id));
    }

    const updatedScores = await db
      .select()
      .from(scores)
      .where(eq(scores.periodId, periodId))
      .orderBy(scores.totalScore);

    const sortedScores = [...updatedScores].sort(
      (a, b) =>
        Number.parseFloat(b.totalScore || "0") -
        Number.parseFloat(a.totalScore || "0"),
    );

    for (let i = 0; i < sortedScores.length; i++) {
      await db
        .update(scores)
        .set({ ranking: i + 1 })
        .where(eq(scores.id, sortedScores[i].id));
    }

    revalidatePath("/perhitungan");
    revalidatePath("/perhitungan/nilai-utility");
    revalidatePath("/perhitungan/hasil");

    return { success: true, message: "Perhitungan SMART berhasil dilakukan" };
  } catch (error) {
    console.error("Calculation error:", error);
    return { success: false, message: "Terjadi kesalahan saat perhitungan" };
  }
}
