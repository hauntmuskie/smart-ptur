"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { criteria, employees, periods, scores } from "@/db/schema";

export async function getData() {
  const [activePeriod] = await db
    .select()
    .from(periods)
    .where(eq(periods.status, "active"))
    .limit(1);

  const employeeList = await db
    .select()
    .from(employees)
    .orderBy(employees.kodeAlternatif);
  const criteriaList = await db.select().from(criteria).orderBy(criteria.kode);

  let scoreList: (typeof scores.$inferSelect)[] = [];
  if (activePeriod) {
    scoreList = await db
      .select()
      .from(scores)
      .where(eq(scores.periodId, activePeriod.id));
  }

  return { activePeriod, employeeList, criteriaList, scoreList };
}
