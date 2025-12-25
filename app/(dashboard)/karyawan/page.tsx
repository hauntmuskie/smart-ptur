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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Data Karyawan</h1>
          <p className="text-muted-foreground">
            Kelola data karyawan Penerbit Erlangga
          </p>
        </div>
        <EmployeeDialog mode="create" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tabel Data Karyawan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead>Kode</TableHead>
                <TableHead>Nama Lengkap</TableHead>
                <TableHead>NIK</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Jenis Kelamin</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Tgl Bergabung</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="py-8 text-center">
                    Belum ada data karyawan
                  </TableCell>
                </TableRow>
              ) : (
                employeeList.map((employee, index) => (
                  <TableRow key={employee.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{employee.kodeAlternatif}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {employee.namaLengkap}
                    </TableCell>
                    <TableCell>{employee.nik}</TableCell>
                    <TableCell>{employee.barcode || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.jenisKelamin === "L"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {employee.jenisKelamin === "L"
                          ? "Laki-laki"
                          : "Perempuan"}
                      </Badge>
                    </TableCell>
                    <TableCell>{employee.departemen}</TableCell>
                    <TableCell>{employee.jabatan || "-"}</TableCell>
                    <TableCell>
                      {employee.tanggalBergabung
                        ? new Date(
                            employee.tanggalBergabung,
                          ).toLocaleDateString("id-ID")
                        : "-"}
                    </TableCell>
                    <TableCell className="space-x-2 text-right">
                      <EmployeeDialog mode="edit" employee={employee} />
                      <DeleteEmployeeButton
                        id={employee.id}
                        name={employee.namaLengkap}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
