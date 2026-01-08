import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getData } from "./_actions";
import { CalculationButton } from "./_components/calculation-button";

function formatNumber(value: string | number): string {
  const num = typeof value === "string" ? Number.parseFloat(value) : value;
  if (Number.isNaN(num)) return "0";
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
}

export default async function PerhitunganPage() {
  const { scoreList, criteriaList } = await getData();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
            Proses Perhitungan
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Perhitungan metode SMART untuk menentukan karyawan terbaik
          </p>
        </div>
        <CalculationButton />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Bobot Kriteria</CardTitle>
            <CardDescription className="text-xs">
              Normalisasi bobot perhitungan
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4 text-xs">Kode</TableHead>
                    <TableHead className="text-center text-xs">Bobot</TableHead>
                    <TableHead className="pr-4 text-center text-xs">
                      Norm
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {criteriaList.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="py-2 pl-4">
                        <Badge variant="outline" className="text-xs">
                          {c.kode}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2 text-center text-xs">
                        {formatNumber(c.bobot || "0")}%
                      </TableCell>
                      <TableCell className="py-2 pr-4 text-center text-xs">
                        {formatNumber(c.normalisasiBobot || "0")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Tabel Nilai Alternatif</CardTitle>
            <CardDescription className="text-xs">
              Data nilai setiap karyawan pada setiap kriteria
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4 text-xs">Kode</TableHead>
                    <TableHead className="text-xs">Nama</TableHead>
                    <TableHead className="text-center text-xs">K1</TableHead>
                    <TableHead className="text-center text-xs">K2</TableHead>
                    <TableHead className="text-center text-xs">K3</TableHead>
                    <TableHead className="text-center text-xs">K4</TableHead>
                    <TableHead className="pr-4 text-center text-xs">
                      K5
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scoreList.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="py-8 text-center text-sm"
                      >
                        Belum ada data nilai. Silakan input nilai di halaman
                        Pembobotan.
                      </TableCell>
                    </TableRow>
                  ) : (
                    scoreList.map(({ score, employee }) => (
                      <TableRow key={score.id}>
                        <TableCell className="py-2 pl-4">
                          <Badge variant="outline" className="text-xs">
                            {employee.kodeAlternatif}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[100px] truncate py-2 text-xs">
                          {employee.namaLengkap}
                        </TableCell>
                        <TableCell className="py-2 text-center text-xs">
                          {formatNumber(score.k1Score || "0")}
                        </TableCell>
                        <TableCell className="py-2 text-center text-xs">
                          {formatNumber(score.k2Score || "0")}
                        </TableCell>
                        <TableCell className="py-2 text-center text-xs">
                          {formatNumber(score.k3Score || "0")}
                        </TableCell>
                        <TableCell className="py-2 text-center text-xs">
                          {formatNumber(score.k4Score || "0")}
                        </TableCell>
                        <TableCell className="py-2 pr-4 text-center text-xs">
                          {formatNumber(score.k5Score || "0")}
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
    </div>
  );
}
