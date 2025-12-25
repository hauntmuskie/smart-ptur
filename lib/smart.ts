export interface EmployeeScore {
  employeeId: number;
  k1Score: number;
  k2Score: number;
  k3Score: number;
  k4Score: number;
}

export interface NormalizedScore extends EmployeeScore {
  k1Normalized: number;
  k2Normalized: number;
  k3Normalized: number;
  k4Normalized: number;
}

export interface WeightedScore extends NormalizedScore {
  k1Weighted: number;
  k2Weighted: number;
  k3Weighted: number;
  k4Weighted: number;
  totalScore: number;
}

export interface RankingResult extends WeightedScore {
  ranking: number;
  grade: "sangat_baik" | "baik" | "kurang";
}

export function normalizeScore(
  value: number,
  minValue: number,
  maxValue: number,
): number {
  if (maxValue === minValue) return 1;
  return (value - minValue) / (maxValue - minValue);
}

export function calculateWeightedScore(
  normalizedValue: number,
  weight: number,
): number {
  return normalizedValue * weight;
}

export function determineGrade(
  totalScore: number,
): "sangat_baik" | "baik" | "kurang" {
  const percentScore = totalScore * 100;
  if (percentScore >= 90) return "sangat_baik";
  if (percentScore >= 75) return "baik";
  return "kurang";
}

export function calculateSMART(
  scores: EmployeeScore[],
  weights: { k1: number; k2: number; k3: number; k4: number },
): RankingResult[] {
  if (scores.length === 0) return [];

  const k1Values = scores.map((s) => s.k1Score);
  const k2Values = scores.map((s) => s.k2Score);
  const k3Values = scores.map((s) => s.k3Score);
  const k4Values = scores.map((s) => s.k4Score);

  const minMax = {
    k1: { min: Math.min(...k1Values), max: Math.max(...k1Values) },
    k2: { min: Math.min(...k2Values), max: Math.max(...k2Values) },
    k3: { min: Math.min(...k3Values), max: Math.max(...k3Values) },
    k4: { min: Math.min(...k4Values), max: Math.max(...k4Values) },
  };

  const normalizedScores: NormalizedScore[] = scores.map((score) => ({
    ...score,
    k1Normalized: normalizeScore(score.k1Score, minMax.k1.min, minMax.k1.max),
    k2Normalized: normalizeScore(score.k2Score, minMax.k2.min, minMax.k2.max),
    k3Normalized: normalizeScore(score.k3Score, minMax.k3.min, minMax.k3.max),
    k4Normalized: normalizeScore(score.k4Score, minMax.k4.min, minMax.k4.max),
  }));

  const weightedScores: WeightedScore[] = normalizedScores.map((score) => {
    const k1Weighted = calculateWeightedScore(score.k1Normalized, weights.k1);
    const k2Weighted = calculateWeightedScore(score.k2Normalized, weights.k2);
    const k3Weighted = calculateWeightedScore(score.k3Normalized, weights.k3);
    const k4Weighted = calculateWeightedScore(score.k4Normalized, weights.k4);
    const totalScore = k1Weighted + k2Weighted + k3Weighted + k4Weighted;

    return {
      ...score,
      k1Weighted,
      k2Weighted,
      k3Weighted,
      k4Weighted,
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
  grade: "sangat_baik" | "baik" | "kurang",
): string {
  switch (grade) {
    case "sangat_baik":
      return "Sangat Baik";
    case "baik":
      return "Baik";
    case "kurang":
      return "Kurang";
  }
}

export function getGradeColor(
  grade: "sangat_baik" | "baik" | "kurang",
): string {
  switch (grade) {
    case "sangat_baik":
      return "bg-green-100 text-green-800";
    case "baik":
      return "bg-yellow-100 text-yellow-800";
    case "kurang":
      return "bg-red-100 text-red-800";
  }
}
