import { eq } from "drizzle-orm";
import { db } from "@/db";
import { employees, scores } from "@/db/schema";
import { ReportContentLayout } from "../_components/report-content-layout";
import { ReportHeader } from "../_components/report-header";
import { ReportSignature } from "../_components/report-signature";
import { ReportWrapperClient } from "./report-client";

function formatNumber(value: string | null): string {
  if (!value) return "0";
  const num = Number.parseFloat(value);
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
}

function getGradeLabel(grade: string | null) {
  if (grade === "sangat_baik") return "Sangat Baik";
  if (grade === "baik") return "Baik";
  if (grade === "cukup") return "Cukup";
  return "Buruk";
}

async function getData() {
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

export default async function LaporanHasilPage() {
  const { scoreList } = await getData();
  const hasResults = scoreList.some((s) => s.score.totalScore);
  const winner = hasResults
    ? scoreList.find((s) => s.score.ranking === 1)
    : null;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1 print:hidden">
        <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
          Laporan Nilai Akhir
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Preview dan cetak laporan hasil perangkingan
        </p>
      </div>

      <ReportWrapperClient reportTitle="Laporan Nilai Akhir">
        <ReportContentLayout
          signature={
            <ReportSignature
              date={new Date()}
              position="Staff Keuangan AR"
              name="Gosjali Saputra"
            />
          }
        >
          <ReportHeader title="Laporan Nilai Akhir dan Perangkingan" />

          {winner && (
            <div className="mt-6 rounded border-2 border-[#1a365d] bg-blue-50 p-4">
              <h3 className="mb-2 font-semibold text-[#1a365d]">
                Karyawan Terbaik
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-yellow-400 font-bold text-white">
                  #1
                </div>
                <div>
                  <p className="font-bold text-lg">
                    {winner.employee.namaLengkap}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {winner.employee.departemen} - {winner.employee.jabatan}
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-medium">Score:</span>{" "}
                    {formatNumber(winner.score.totalScore)} |{" "}
                    <span className="font-medium">Grade:</span>{" "}
                    {getGradeLabel(winner.score.grade)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="mb-3 font-semibold text-[#1a365d]">
              Tabel Perangkingan Lengkap
            </h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-center">
                    Ranking
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left">
                    Kode
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left">
                    Nama Karyawan
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left">
                    Departemen
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-center">
                    Total Score
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-center">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {!hasResults ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="border border-gray-300 px-2 py-4 text-center text-gray-500"
                    >
                      Belum ada hasil perhitungan
                    </td>
                  </tr>
                ) : (
                  scoreList.map(({ score, employee }) => (
                    <tr
                      key={score.id}
                      className={score.ranking === 1 ? "bg-yellow-50" : ""}
                    >
                      <td className="border border-gray-300 px-2 py-1.5 text-center font-bold">
                        #{score.ranking}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5">
                        {employee.kodeAlternatif}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5">
                        {employee.namaLengkap}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5">
                        {employee.departemen}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center font-medium">
                        {formatNumber(score.totalScore)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center">
                        {getGradeLabel(score.grade)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 font-semibold text-[#1a365d]">Keterangan</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Sangat Baik:</span> Score {">="}{" "}
                90
              </p>
              <p>
                <span className="font-medium">Baik:</span> Score 80 - 89
              </p>
              <p>
                <span className="font-medium">Cukup:</span> Score 66 - 79
              </p>
              <p>
                <span className="font-medium">Buruk:</span> Score {"<"} 65
              </p>
            </div>
          </div>
        </ReportContentLayout>
      </ReportWrapperClient>
    </div>
  );
}
