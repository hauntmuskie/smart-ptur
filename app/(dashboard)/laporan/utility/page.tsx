import { eq } from "drizzle-orm";
import { db } from "@/db";
import { criteria, employees, scores } from "@/db/schema";
import { ReportContentLayout } from "../_components/report-content-layout";
import { ReportHeader } from "../_components/report-header";
import { ReportSignature } from "../_components/report-signature";
import { ReportWrapperClient } from "./report-client";

function formatNumber(value: string | null): string {
  if (!value) return "0";
  const num = Number.parseFloat(value);
  return num % 1 === 0 ? num.toString() : num.toFixed(3);
}

async function getData() {
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

export default async function LaporanUtilityPage() {
  const { scoreList, criteriaList } = await getData();
  const hasCalculation = scoreList.some((s) => s.score.totalScore);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1 print:hidden">
        <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
          Laporan Nilai Utility
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Preview dan cetak laporan nilai utility
        </p>
      </div>

      <ReportWrapperClient reportTitle="Laporan Nilai Utility">
        <ReportContentLayout
          signature={
            <ReportSignature
              date={new Date()}
              position="Staff Keuangan AR"
              name="Gosjali Saputra"
            />
          }
        >
          <ReportHeader title="Laporan Nilai Utility" />

          <div className="mt-6">
            <p className="mb-3 text-gray-600 text-sm">
              Rumus: Ui(ai) = 100 x (nilai - 0) / (100 - 0)
            </p>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-center">
                    No
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left">
                    Nama Karyawan
                  </th>
                  {criteriaList.map((c) => (
                    <th
                      key={c.id}
                      className="border border-gray-300 px-2 py-2 text-center"
                    >
                      Ui({c.kode})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!hasCalculation ? (
                  <tr>
                    <td
                      colSpan={criteriaList.length + 2}
                      className="border border-gray-300 px-2 py-4 text-center text-gray-500"
                    >
                      Belum ada data perhitungan
                    </td>
                  </tr>
                ) : (
                  scoreList.map(({ score, employee }, index) => (
                    <tr key={score.id}>
                      <td className="border border-gray-300 px-2 py-1.5 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5">
                        {employee.namaLengkap}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center">
                        {formatNumber(score.k1Utility)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center">
                        {formatNumber(score.k2Utility)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center">
                        {formatNumber(score.k3Utility)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center">
                        {formatNumber(score.k4Utility)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center">
                        {formatNumber(score.k5Utility)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </ReportContentLayout>
      </ReportWrapperClient>
    </div>
  );
}
