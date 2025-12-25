"use server";

import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { criteria, employees, periods, scores } from "@/db/schema";

export async function getStats() {
  const [employeeCount] = await db.select({ count: count() }).from(employees);
  const [criteriaCount] = await db.select({ count: count() }).from(criteria);
  const [activePeriod] = await db
    .select()
    .from(periods)
    .where(eq(periods.status, "active"))
    .limit(1);
  const [scoreCount] = await db
    .select({ count: count() })
    .from(scores)
    .where(activePeriod ? eq(scores.periodId, activePeriod.id) : undefined);

  return {
    employees: employeeCount?.count || 0,
    criteria: criteriaCount?.count || 0,
    period: activePeriod?.name || "Belum ada",
    scores: scoreCount?.count || 0,
  };
}
