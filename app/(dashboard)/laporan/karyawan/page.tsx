import { db } from "@/db";
import { employees } from "@/db/schema";
import { ReportBackButton } from "../_components/report-back-button";
import { ReportContentLayout } from "../_components/report-content-layout";
import { ReportHeader } from "../_components/report-header";
import { ReportSignature } from "../_components/report-signature";
import { ReportWrapperClient } from "./report-client";

async function getEmployees() {
  return db.select().from(employees).orderBy(employees.kodeAlternatif);
}

export default async function LaporanKaryawanPage() {
  const employeeList = await getEmployees();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1 print:hidden">
        <ReportBackButton />
        <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
          Laporan Data Karyawan
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Preview dan cetak laporan data karyawan
        </p>
      </div>

      <ReportWrapperClient reportTitle="Laporan Data Karyawan">
        <ReportContentLayout
          signature={
            <ReportSignature
              date={new Date()}
              position="Staff Keuangan AR"
              name="Gosjali Saputra"
            />
          }
        >
          <ReportHeader title="Laporan Data Karyawan" />

          <div className="mt-6 overflow-hidden">
            <table
              className="w-full border-collapse"
              style={{ tableLayout: "auto", fontSize: "10px" }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th
                    style={{
                      width: "5%",
                      border: "1px solid #d1d5db",
                      padding: "6px 4px",
                      textAlign: "center",
                    }}
                  >
                    No
                  </th>
                  <th
                    style={{
                      width: "8%",
                      border: "1px solid #d1d5db",
                      padding: "6px 4px",
                      textAlign: "center",
                    }}
                  >
                    Kode
                  </th>
                  <th
                    style={{
                      width: "25%",
                      border: "1px solid #d1d5db",
                      padding: "6px 4px",
                      textAlign: "left",
                    }}
                  >
                    Nama Lengkap
                  </th>
                  <th
                    style={{
                      width: "15%",
                      border: "1px solid #d1d5db",
                      padding: "6px 4px",
                      textAlign: "center",
                    }}
                  >
                    NIK
                  </th>
                  <th
                    style={{
                      width: "7%",
                      border: "1px solid #d1d5db",
                      padding: "6px 4px",
                      textAlign: "center",
                    }}
                  >
                    L/P
                  </th>
                  <th
                    style={{
                      width: "22%",
                      border: "1px solid #d1d5db",
                      padding: "6px 4px",
                      textAlign: "left",
                    }}
                  >
                    Departemen
                  </th>
                  <th
                    style={{
                      width: "18%",
                      border: "1px solid #d1d5db",
                      padding: "6px 4px",
                      textAlign: "left",
                    }}
                  >
                    Jabatan
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "16px 4px",
                        textAlign: "center",
                        color: "#6b7280",
                      }}
                    >
                      Belum ada data karyawan
                    </td>
                  </tr>
                ) : (
                  employeeList.map((employee, index) => (
                    <tr key={employee.id}>
                      <td
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "4px",
                          textAlign: "center",
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "4px",
                          textAlign: "center",
                        }}
                      >
                        {employee.kodeAlternatif}
                      </td>
                      <td
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "4px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {employee.namaLengkap}
                      </td>
                      <td
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "4px",
                          textAlign: "center",
                        }}
                      >
                        {employee.nik}
                      </td>
                      <td
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "4px",
                          textAlign: "center",
                        }}
                      >
                        {employee.jenisKelamin}
                      </td>
                      <td
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "4px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {employee.departemen}
                      </td>
                      <td
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "4px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {employee.jabatan || "-"}
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
