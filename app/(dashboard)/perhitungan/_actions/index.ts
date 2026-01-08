"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { criteria, employees, scores } from "@/db/schema";

export async function getData() {
  const scoreList = await db
    .select({
      score: scores,
      employee: employees,
    })
    .from(scores)
    .innerJoin(employees, eq(scores.employeeId, employees.id))
    .orderBy(employees.kodeAlternatif);

  const criteriaList = await db.select().from(criteria).orderBy(criteria.kode);

  return { scoreList, criteriaList };
}
