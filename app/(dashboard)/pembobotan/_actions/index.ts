"use server";

import { db } from "@/db";
import { criteria, employees, scores } from "@/db/schema";

export async function getData() {
  const employeeList = await db
    .select()
    .from(employees)
    .orderBy(employees.kodeAlternatif);
  const criteriaList = await db.select().from(criteria).orderBy(criteria.kode);
  const scoreList = await db.select().from(scores);

  return { employeeList, criteriaList, scoreList };
}
