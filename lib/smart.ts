export interface EmployeeScore {
  employeeId: number;
  k1Score: number;
  k2Score: number;
  k3Score: number;
  k4Score: number;
  k5Score: number;
}

export interface UtilityScore extends EmployeeScore {
  k1Utility: number;
  k2Utility: number;
  k3Utility: number;
  k4Utility: number;
  k5Utility: number;
}

export interface WeightedScore extends UtilityScore {
  k1Weighted: number;
  k2Weighted: number;
  k3Weighted: number;
  k4Weighted: number;
  k5Weighted: number;
  totalScore: number;
}

export interface RankingResult extends WeightedScore {
  ranking: number;
  grade: "sangat_baik" | "baik" | "cukup" | "buruk";
}

export function calculateUtility(value: number): number {
  return (100 * (value - 0)) / (100 - 0);
}

export function calculateWeightedScore(
  utilityValue: number,
  weight: number,
): number {
  return utilityValue * weight;
}

export function determineGrade(
  totalScore: number,
): "sangat_baik" | "baik" | "cukup" | "buruk" {
  if (totalScore >= 90) return "sangat_baik";
  if (totalScore >= 80) return "baik";
  if (totalScore >= 66) return "cukup";
  return "buruk";
}

export function calculateSMART(
  scores: EmployeeScore[],
  weights: { k1: number; k2: number; k3: number; k4: number; k5: number },
): RankingResult[] {
  if (scores.length === 0) return [];

  const utilityScores: UtilityScore[] = scores.map((score) => ({
    ...score,
    k1Utility: calculateUtility(score.k1Score),
    k2Utility: calculateUtility(score.k2Score),
    k3Utility: calculateUtility(score.k3Score),
    k4Utility: calculateUtility(score.k4Score),
    k5Utility: calculateUtility(score.k5Score),
  }));

  const weightedScores: WeightedScore[] = utilityScores.map((score) => {
    const k1Weighted = calculateWeightedScore(score.k1Utility, weights.k1);
    const k2Weighted = calculateWeightedScore(score.k2Utility, weights.k2);
    const k3Weighted = calculateWeightedScore(score.k3Utility, weights.k3);
    const k4Weighted = calculateWeightedScore(score.k4Utility, weights.k4);
    const k5Weighted = calculateWeightedScore(score.k5Utility, weights.k5);
    const totalScore =
      k1Weighted + k2Weighted + k3Weighted + k4Weighted + k5Weighted;

    return {
      ...score,
      k1Weighted,
      k2Weighted,
      k3Weighted,
      k4Weighted,
      k5Weighted,
      totalScore,
    };
  });

  const sortedScores = [...weightedScores].sort(
    (a, b) => b.totalScore - a.totalScore,
  );

  const results: RankingResult[] = sortedScores.map((score, index) => ({
    ...score,
    ranking: index + 1,
    grade: determineGrade(score.totalScore),
  }));

  return results;
}

export function getGradeLabel(
  grade: "sangat_baik" | "baik" | "cukup" | "buruk",
): string {
  switch (grade) {
    case "sangat_baik":
      return "Sangat Baik";
    case "baik":
      return "Baik";
    case "cukup":
      return "Cukup";
    case "buruk":
      return "Buruk";
  }
}

export function getGradeColor(
  grade: "sangat_baik" | "baik" | "cukup" | "buruk",
): string {
  switch (grade) {
    case "sangat_baik":
      return "bg-green-100 text-green-800";
    case "baik":
      return "bg-blue-100 text-blue-800";
    case "cukup":
      return "bg-yellow-100 text-yellow-800";
    case "buruk":
      return "bg-red-100 text-red-800";
  }
}
