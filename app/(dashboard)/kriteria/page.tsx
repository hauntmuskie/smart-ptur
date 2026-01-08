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
import { getCriteria } from "./_actions";
import { CriteriaDialog } from "./_components/criteria-dialog";
import { DeleteCriteriaButton } from "./_components/delete-button";

export default async function KriteriaPage() {
  const criteriaList = await getCriteria();
  const totalBobot = criteriaList.reduce(
    (sum, c) => sum + Number.parseFloat(c.bobot || "0"),
    0,
  );

  function formatNumber(value: string | number): string {
    const num = typeof value === "string" ? Number.parseFloat(value) : value;
    if (Number.isNaN(num)) return "0";
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
            Kriteria & Bobot
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Kelola kriteria penilaian dan bobot untuk metode SMART
          </p>
        </div>
        <CriteriaDialog mode="create" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Tabel Kriteria dan Bobot
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4 sm:pl-0">Kode</TableHead>
                    <TableHead>Kriteria</TableHead>
                    <TableHead className="text-center">Bobot</TableHead>
                    <TableHead className="pr-4 text-right sm:pr-0">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {criteriaList.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="py-8 text-center text-sm"
                      >
                        Belum ada data kriteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    criteriaList.map((crit) => (
                      <TableRow key={crit.id}>
                        <TableCell className="pl-4 sm:pl-0">
                          <Badge variant="outline" className="text-xs">
                            {crit.kode}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[100px] truncate font-medium text-xs sm:max-w-none sm:text-sm">
                          {crit.nama}
                        </TableCell>
                        <TableCell className="text-center font-medium text-xs sm:text-sm">
                          {formatNumber(crit.bobot || "0")}%
                        </TableCell>
                        <TableCell className="pr-4 sm:pr-0">
                          <div className="flex items-center justify-end gap-1">
                            <CriteriaDialog mode="edit" criteria={crit} />
                            <DeleteCriteriaButton
                              id={crit.id}
                              name={crit.nama}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                  {criteriaList.length > 0 && (
                    <TableRow className="bg-muted/50">
                      <TableCell
                        colSpan={2}
                        className="pl-4 font-semibold text-xs sm:pl-0 sm:text-sm"
                      >
                        Total Bobot
                      </TableCell>
                      <TableCell className="text-center font-semibold text-xs sm:text-sm">
                        {formatNumber(totalBobot)}%
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Tabel Normalisasi Bobot
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4 sm:pl-0">Kode</TableHead>
                    <TableHead>Kriteria</TableHead>
                    <TableHead className="pr-4 text-center sm:pr-0">
                      Normalisasi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {criteriaList.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="py-8 text-center text-sm"
                      >
                        Belum ada data kriteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    criteriaList.map((crit) => (
                      <TableRow key={crit.id}>
                        <TableCell className="pl-4 sm:pl-0">
                          <Badge variant="outline" className="text-xs">
                            {crit.kode}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[100px] truncate font-medium text-xs sm:max-w-none sm:text-sm">
                          {crit.nama}
                        </TableCell>
                        <TableCell className="pr-4 text-center font-medium text-xs sm:pr-0 sm:text-sm">
                          {formatNumber(crit.normalisasiBobot || "0")}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                  {criteriaList.length > 0 && (
                    <TableRow className="bg-muted/50">
                      <TableCell
                        colSpan={2}
                        className="pl-4 font-semibold text-xs sm:pl-0 sm:text-sm"
                      >
                        Total
                      </TableCell>
                      <TableCell className="pr-4 text-center font-semibold text-xs sm:pr-0 sm:text-sm">
                        {formatNumber(
                          criteriaList.reduce(
                            (sum, c) =>
                              sum +
                              Number.parseFloat(c.normalisasiBobot || "0"),
                            0,
                          ),
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">
            Keterangan Kriteria
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="space-y-3">
            {criteriaList.length === 0 ? (
              <p className="py-4 text-center text-muted-foreground text-sm">
                Belum ada data kriteria
              </p>
            ) : (
              criteriaList.map((crit) => (
                <div key={crit.id} className="flex gap-3 rounded-lg border p-3">
                  <Badge variant="outline" className="h-fit shrink-0 text-xs">
                    {crit.kode}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm">{crit.nama}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {crit.keterangan || "Tidak ada keterangan"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
