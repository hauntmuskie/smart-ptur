import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEmployees } from "./_actions";
import { DeleteEmployeeButton } from "./_components/delete-button";
import { EmployeeDialog } from "./_components/employee-dialog";

export default async function KaryawanPage() {
  const employeeList = await getEmployees();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
            Data Karyawan
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Kelola data karyawan Penerbit Erlangga
          </p>
        </div>
        <EmployeeDialog mode="create" />
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">
            Tabel Data Karyawan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="mx-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] pl-4 sm:pl-0">No</TableHead>
                  <TableHead>Nama Lengkap</TableHead>
                  <TableHead className="hidden lg:table-cell">NIK</TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Barcode
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Jenis Kelamin
                  </TableHead>
                  <TableHead>Departemen</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Jabatan
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Tgl Bergabung
                  </TableHead>
                  <TableHead className="pr-4 text-right sm:pr-0">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-8 text-center text-sm">
                      Belum ada data karyawan
                    </TableCell>
                  </TableRow>
                ) : (
                  employeeList.map((employee, index) => (
                    <TableRow key={employee.id}>
                      <TableCell className="pl-4 sm:pl-0">
                        {index + 1}
                      </TableCell>
                      <TableCell className="max-w-[120px] truncate font-medium sm:max-w-none">
                        {employee.namaLengkap}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {employee.nik}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        {employee.barcode || "-"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          variant={
                            employee.jenisKelamin === "L"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {employee.jenisKelamin === "L" ? "L" : "P"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[80px] truncate text-xs sm:max-w-none sm:text-sm">
                        {employee.departemen}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {employee.jabatan || "-"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {employee.tanggalBergabung
                          ? new Date(
                              employee.tanggalBergabung,
                            ).toLocaleDateString("id-ID")
                          : "-"}
                      </TableCell>
                      <TableCell className="pr-4 sm:pr-0">
                        <div className="flex items-center justify-end gap-1">
                          <EmployeeDialog mode="edit" employee={employee} />
                          <DeleteEmployeeButton
                            id={employee.id}
                            name={employee.namaLengkap}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
