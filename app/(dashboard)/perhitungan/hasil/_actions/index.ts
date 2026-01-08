"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { employees, scores } from "@/db/schema";

export async function getData() {
  const scoreList = await db
    .select({
      score: scores,
      employee: employees,
    })
    .from(scores)
    .innerJoin(employees, eq(scores.employeeId, employees.id))
    .orderBy(scores.ranking);

  return { scoreList };
}
