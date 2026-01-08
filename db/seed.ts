import "dotenv/config";
import { hash } from "bcryptjs";
import { db } from "./index";
import * as schema from "./schema";

async function seed() {
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
      nama: "Kinerja",
      bobot: "25",
      normalisasiBobot: "0.25",
      keterangan:
        "Kemampuan karyawan dalam menyelesaikan tugas sesuai target yang telah ditetapkan perusahaan. Penilaian mencakup kualitas hasil kerja, kuantitas pekerjaan, serta ketepatan waktu penyelesaian.",
    },
    {
      kode: "K2",
      nama: "Kedisiplinan",
      bobot: "25",
      normalisasiBobot: "0.25",
      keterangan:
        "Tingkat kepatuhan karyawan terhadap peraturan dan kebijakan perusahaan. Meliputi kehadiran, ketepatan waktu masuk dan pulang kerja, serta kepatuhan terhadap operasional prosedur.",
    },
    {
      kode: "K3",
      nama: "Inisiatif & Kreativitas",
      bobot: "20",
      normalisasiBobot: "0.20",
      keterangan:
        "Kemampuan karyawan dalam mengemukakan ide baru serta solusi inovatif terhadap permasalahan kerja. Mencerminkan keaktifan dan daya pikir kreatif karyawan.",
    },
    {
      kode: "K4",
      nama: "Tanggung Jawab",
      bobot: "15",
      normalisasiBobot: "0.15",
      keterangan:
        "Sejauh mana karyawan mampu melaksanakan tugas dan kewajibannya dengan baik serta menyelesaikan pekerjaan sesuai dengan standar yang telah ditetapkan.",
    },
    {
      kode: "K5",
      nama: "Kerja Sama Tim",
      bobot: "15",
      normalisasiBobot: "0.15",
      keterangan:
        "Kemampuan karyawan dalam bekerja sama dengan sesama rekan kerja, atasan, maupun dengan orang lain di lingkungan perusahaan.",
    },
  ]);
  console.log(
    "Created 5 default criteria (K1-K5) with weights: K1=25%, K2=25%, K3=20%, K4=15%, K5=15%",
  );

  await db.insert(schema.employees).values([
    {
      kodeAlternatif: "C1",
      namaLengkap: "Nofrianto",
      nik: "ERL001",
      barcode: "BC001",
      jenisKelamin: "L",
      departemen: "Penerbit Erlangga",
      jabatan: "Staff",
      tanggalBergabung: new Date("2023-01-15"),
    },
    {
      kodeAlternatif: "C2",
      namaLengkap: "Ayu Wardhani",
      nik: "ERL002",
      barcode: "BC002",
      jenisKelamin: "P",
      departemen: "Penerbit Erlangga",
      jabatan: "Staff",
      tanggalBergabung: new Date("2022-06-01"),
    },
    {
      kodeAlternatif: "C3",
      namaLengkap: "Hertia Dwi Ais",
      nik: "ERL003",
      barcode: "BC003",
      jenisKelamin: "P",
      departemen: "Penerbit Erlangga",
      jabatan: "Staff",
      tanggalBergabung: new Date("2021-03-10"),
    },
    {
      kodeAlternatif: "C4",
      namaLengkap: "Cayo Gustiono",
      nik: "ERL004",
      barcode: "BC004",
      jenisKelamin: "L",
      departemen: "Penerbit Erlangga",
      jabatan: "Staff",
      tanggalBergabung: new Date("2023-08-20"),
    },
    {
      kodeAlternatif: "C5",
      namaLengkap: "Agnis Fadhillah",
      nik: "ERL005",
      barcode: "BC005",
      jenisKelamin: "P",
      departemen: "Penerbit Erlangga",
      jabatan: "Staff",
      tanggalBergabung: new Date("2022-11-05"),
    },
  ]);
  console.log("Created 5 sample employees (C1-C5) from the paper");

  await db.insert(schema.periods).values({
    name: "Januari 2025",
    bulan: 1,
    tahun: 2025,
    status: "active",
  });
  console.log("Created evaluation period: Januari 2025");

  await db.insert(schema.scores).values([
    {
      employeeId: 1,
      periodId: 1,
      k1Score: "75",
      k2Score: "60",
      k3Score: "90",
      k4Score: "100",
      k5Score: "85",
    },
    {
      employeeId: 2,
      periodId: 1,
      k1Score: "90",
      k2Score: "90",
      k3Score: "85",
      k4Score: "90",
      k5Score: "85",
    },
    {
      employeeId: 3,
      periodId: 1,
      k1Score: "100",
      k2Score: "90",
      k3Score: "100",
      k4Score: "90",
      k5Score: "85",
    },
    {
      employeeId: 4,
      periodId: 1,
      k1Score: "90",
      k2Score: "70",
      k3Score: "90",
      k4Score: "90",
      k5Score: "85",
    },
    {
      employeeId: 5,
      periodId: 1,
      k1Score: "90",
      k2Score: "60",
      k3Score: "60",
      k4Score: "70",
      k5Score: "85",
    },
  ]);
  console.log(
    "Created sample scores for 5 employees (C1-C5) based on the paper",
  );

  console.log("\nSeeding completed successfully!");
  console.log("\nDefault Admin Login:");
  console.log("  Username: admin");
  console.log("  Password: admin123");

  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
