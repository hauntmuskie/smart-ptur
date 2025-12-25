"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { employees, periods, scores } from "@/db/schema";

export async function getData() {
  const [activePeriod] = await db
    .select()
    .from(periods)
    .where(eq(periods.status, "active"))
    .limit(1);

  if (!activePeriod) {
    return { activePeriod: null, scoreList: [] };
  }

  const scoreList = await db
    .select({
      scores,
      employees,
    })
    .from(scores)
    .innerJoin(employees, eq(scores.employeeId, employees.id))
    .where(eq(scores.periodId, activePeriod.id))
    .orderBy(scores.ranking);

  return { activePeriod, scoreList };
}
