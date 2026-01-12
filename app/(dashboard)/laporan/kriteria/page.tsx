import { db } from "@/db";
import { criteria } from "@/db/schema";
import { ReportContentLayout } from "../_components/report-content-layout";
import { ReportHeader } from "../_components/report-header";
import { ReportSignature } from "../_components/report-signature";
import { ReportWrapperClient } from "./report-client";

function formatNumber(value: string | number | null): string {
  if (value === null) return "0";
  const num = typeof value === "string" ? Number.parseFloat(value) : value;
  if (Number.isNaN(num)) return "0";
  return num % 1 === 0 ? num.toString() : num.toFixed(4);
}

async function getCriteria() {
  return db.select().from(criteria).orderBy(criteria.kode);
}

export default async function LaporanKriteriaPage() {
  const criteriaList = await getCriteria();
  const totalBobot = criteriaList.reduce(
    (sum, c) => sum + Number.parseFloat(c.bobot || "0"),
    0,
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1 print:hidden">
        <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
          Laporan Data Kriteria
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Preview dan cetak laporan kriteria dan bobot
        </p>
      </div>

      <ReportWrapperClient reportTitle="Laporan Data Kriteria">
        <ReportContentLayout
          signature={
            <ReportSignature
              date={new Date()}
              position="Staff Keuangan AR"
              name="Gosjali Saputra"
            />
          }
        >
          <ReportHeader title="Laporan Data Kriteria" />

          <div className="mt-6">
            <h3 className="mb-3 font-semibold text-[#1a365d]">
              Tabel Kriteria dan Bobot
            </h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-center">
                    No
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-center">
                    Kode
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left">
                    Nama Kriteria
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-center">
                    Bobot (%)
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-center">
                    Normalisasi
                  </th>
                </tr>
              </thead>
              <tbody>
                {criteriaList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="border border-gray-300 px-2 py-4 text-center text-gray-500"
                    >
                      Belum ada data kriteria
                    </td>
                  </tr>
                ) : (
                  <>
                    {criteriaList.map((crit, index) => (
                      <tr key={crit.id}>
                        <td className="border border-gray-300 px-2 py-1.5 text-center">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-2 py-1.5 text-center">
                          {crit.kode}
                        </td>
                        <td className="border border-gray-300 px-2 py-1.5">
                          {crit.nama}
                        </td>
                        <td className="border border-gray-300 px-2 py-1.5 text-center">
                          {formatNumber(crit.bobot)}%
                        </td>
                        <td className="border border-gray-300 px-2 py-1.5 text-center">
                          {formatNumber(crit.normalisasiBobot)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-semibold">
                      <td
                        colSpan={3}
                        className="border border-gray-300 px-2 py-1.5"
                      >
                        Total Bobot
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center">
                        {formatNumber(totalBobot)}%
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center">
                        {formatNumber(
                          criteriaList.reduce(
                            (sum, c) =>
                              sum +
                              Number.parseFloat(c.normalisasiBobot || "0"),
                            0,
                          ),
                        )}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {criteriaList.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 font-semibold text-[#1a365d]">
                Keterangan Kriteria
              </h3>
              <div className="space-y-2 text-sm">
                {criteriaList.map((crit) => (
                  <div key={crit.id} className="flex gap-2">
                    <span className="font-medium">{crit.kode}:</span>
                    <span>
                      {crit.nama}
                      {crit.keterangan && ` - ${crit.keterangan}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ReportContentLayout>
      </ReportWrapperClient>
    </div>
  );
}
