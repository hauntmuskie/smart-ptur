"use server";

import { db } from "@/db";
import { employees } from "@/db/schema";

export async function getEmployees() {
  return db.select().from(employees).orderBy(employees.kodeAlternatif);
}
