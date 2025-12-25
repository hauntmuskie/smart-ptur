import { hash } from "bcryptjs";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "spk_smart",
  });

  const db = drizzle({ client: connection, schema, mode: "default" });

  console.log("Seeding database...");

  const hashedPassword = await hash("admin123", 10);
  await db.insert(schema.users).values({
    username: "admin",
    password: hashedPassword,
    name: "Administrator HRD",
    role: "admin",
  });
  console.log("Created admin user (username: admin, password: admin123)");

  await db.insert(schema.criteria).values([
    {
      kode: "K1",
      nama: "Disiplin",
      bobot: "25",
      normalisasiBobot: "0.25",
      keterangan:
        "Penilaian kedisiplinan karyawan berdasarkan kepatuhan terhadap aturan dan waktu kerja",
    },
    {
      kode: "K2",
      nama: "Kehadiran",
      bobot: "25",
      normalisasiBobot: "0.25",
      keterangan:
        "Penilaian tingkat kehadiran karyawan selama periode evaluasi",
    },
    {
      kode: "K3",
      nama: "Prestasi",
      bobot: "25",
      normalisasiBobot: "0.25",
      keterangan:
        "Penilaian pencapaian target dan kualitas hasil kerja karyawan",
    },
    {
      kode: "K4",
      nama: "Tanggung Jawab",
      bobot: "25",
      normalisasiBobot: "0.25",
      keterangan:
        "Penilaian tingkat tanggung jawab karyawan dalam melaksanakan tugas",
    },
  ]);
  console.log("Created 4 default criteria (K1-K4) with equal weights (25%)");

  await db.insert(schema.employees).values([
    {
      kodeAlternatif: "C1",
      namaLengkap: "Hertia Dwi Ais",
      nik: "ERL001",
      barcode: "BC001",
      jenisKelamin: "P",
      departemen: "Marketing",
      jabatan: "Staff Marketing",
      tanggalBergabung: "2023-01-15",
    },
    {
      kodeAlternatif: "C2",
      namaLengkap: "Agnis Fadhillah",
      nik: "ERL002",
      barcode: "BC002",
      jenisKelamin: "P",
      departemen: "Purchasing",
      jabatan: "Staff Purchasing",
      tanggalBergabung: "2022-06-01",
    },
    {
      kodeAlternatif: "C3",
      namaLengkap: "Ayu Wardani",
      nik: "ERL003",
      barcode: "BC003",
      jenisKelamin: "P",
      departemen: "HR GA",
      jabatan: "Staff HR",
      tanggalBergabung: "2021-03-10",
    },
    {
      kodeAlternatif: "C4",
      namaLengkap: "Shidqii Rizqulloh",
      nik: "ERL004",
      barcode: "BC004",
      jenisKelamin: "L",
      departemen: "Sales",
      jabatan: "Staff Sales",
      tanggalBergabung: "2023-08-20",
    },
    {
      kodeAlternatif: "C5",
      namaLengkap: "Cayo Gustiono",
      nik: "ERL005",
      barcode: "BC005",
      jenisKelamin: "L",
      departemen: "Ekspedisi",
      jabatan: "Staff Ekspedisi",
      tanggalBergabung: "2022-11-05",
    },
  ]);
  console.log("Created 5 sample employees (C1-C5)");

  await db.insert(schema.periods).values({
    name: "Oktober 2025",
    bulan: 10,
    tahun: 2025,
    status: "active",
  });
  console.log("Created evaluation period: Oktober 2025");

  await db.insert(schema.scores).values([
    {
      employeeId: 1,
      periodId: 1,
      k1Score: "95",
      k2Score: "85",
      k3Score: "80",
      k4Score: "95",
    },
    {
      employeeId: 2,
      periodId: 1,
      k1Score: "80",
      k2Score: "90",
      k3Score: "85",
      k4Score: "85",
    },
    {
      employeeId: 3,
      periodId: 1,
      k1Score: "95",
      k2Score: "95",
      k3Score: "70",
      k4Score: "95",
    },
    {
      employeeId: 4,
      periodId: 1,
      k1Score: "90",
      k2Score: "95",
      k3Score: "95",
      k4Score: "95",
    },
    {
      employeeId: 5,
      periodId: 1,
      k1Score: "85",
      k2Score: "80",
      k3Score: "80",
      k4Score: "85",
    },
  ]);
  console.log("Created sample scores for all employees");

  console.log("\nSeeding completed successfully!");
  console.log("\nDefault Admin Login:");
  console.log("  Username: admin");
  console.log("  Password: admin123");

  await connection.end();
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
