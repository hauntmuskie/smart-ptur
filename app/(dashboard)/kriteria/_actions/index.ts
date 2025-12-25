"use server";

import { db } from "@/db";
import { criteria } from "@/db/schema";

export async function getCriteria() {
  return db.select().from(criteria).orderBy(criteria.kode);
}
