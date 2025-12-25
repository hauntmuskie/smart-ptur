"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { criteria, employees, scores } from "@/db/schema";
import { calculateSMART, type EmployeeScore } from "@/lib/smart";

export async function runSMARTCalculation(periodId: number) {
  try {
    const criteriaList = await db
      .select()
      .from(criteria)
      .orderBy(criteria.kode);

    if (criteriaList.length !== 4) {
      return { success: false, message: "Kriteria harus berjumlah 4 (K1-K4)" };
    }

    const scoreList = await db
      .select()
      .from(scores)
      .where(eq(scores.periodId, periodId));

    if (scoreList.length === 0) {
      return {
        success: false,
        message: "Belum ada data nilai untuk periode ini",
      };
    }

    const employeeScores: EmployeeScore[] = scoreList.map((s) => ({
      employeeId: s.employeeId,
      k1Score: parseFloat(s.k1Score || "0"),
      k2Score: parseFloat(s.k2Score || "0"),
      k3Score: parseFloat(s.k3Score || "0"),
      k4Score: parseFloat(s.k4Score || "0"),
    }));

    const weights = {
      k1: parseFloat(criteriaList[0].normalisasiBobot || "0.25"),
      k2: parseFloat(criteriaList[1].normalisasiBobot || "0.25"),
      k3: parseFloat(criteriaList[2].normalisasiBobot || "0.25"),
      k4: parseFloat(criteriaList[3].normalisasiBobot || "0.25"),
    };

    const results = calculateSMART(employeeScores, weights);

    for (const result of results) {
      await db
        .update(scores)
        .set({
          k1Normalized: result.k1Normalized.toFixed(4),
          k2Normalized: result.k2Normalized.toFixed(4),
          k3Normalized: result.k3Normalized.toFixed(4),
          k4Normalized: result.k4Normalized.toFixed(4),
          totalScore: result.totalScore.toFixed(4),
          ranking: result.ranking,
          grade: result.grade,
        })
        .where(eq(scores.employeeId, result.employeeId));
    }

    revalidatePath("/perhitungan");
    revalidatePath("/hasil");

    return {
      success: true,
      message: `Perhitungan SMART berhasil. ${results.length} karyawan telah dihitung.`,
      results,
    };
  } catch (error) {
    console.error("SMART calculation error:", error);
    return { success: false, message: "Gagal melakukan perhitungan SMART" };
  }
}

export async function getCalculationData() {
  const scoreList = await db
    .select({
      score: scores,
      employee: employees,
    })
    .from(scores)
    .innerJoin(employees, eq(scores.employeeId, employees.id))
    .orderBy(scores.ranking);

  return scoreList;
}
