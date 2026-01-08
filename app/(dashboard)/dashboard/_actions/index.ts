"use server";

import { count } from "drizzle-orm";
import { db } from "@/db";
import { criteria, employees, scores } from "@/db/schema";

export async function getStats() {
  const [employeeCount] = await db.select({ count: count() }).from(employees);
  const [criteriaCount] = await db.select({ count: count() }).from(criteria);
  const [scoreCount] = await db.select({ count: count() }).from(scores);

  return {
    employees: employeeCount?.count || 0,
    criteria: criteriaCount?.count || 0,
    scores: scoreCount?.count || 0,
  };
}
