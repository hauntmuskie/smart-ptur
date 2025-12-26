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

export default async function PerhitunganPage() {
  const { activePeriod, scoreList, criteriaList } = await getData();

  if (!activePeriod) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
            Proses Perhitungan
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Perhitungan metode SMART untuk menentukan karyawan terbaik
          </p>
        </div>
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground text-sm">
              Belum ada periode aktif. Silakan buat periode di halaman
              Pembobotan.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
            Proses Perhitungan
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Perhitungan metode SMART - Periode: {activePeriod.name}
          </p>
        </div>
        <CalculationButton periodId={activePeriod.id} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Bobot Kriteria
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Normalisasi bobot yang digunakan dalam perhitungan
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4 sm:pl-0">Kode</TableHead>
                    <TableHead>Kriteria</TableHead>
                    <TableHead className="text-center">Bobot</TableHead>
                    <TableHead className="pr-4 text-center sm:pr-0">
                      Normalisasi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {criteriaList.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="pl-4 sm:pl-0">
                        <Badge variant="outline" className="text-xs">
                          {c.kode}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[80px] truncate text-xs sm:max-w-none sm:text-sm">
                        {c.nama}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        {c.bobot}%
                      </TableCell>
                      <TableCell className="pr-4 text-center text-xs sm:pr-0 sm:text-sm">
                        {parseFloat(c.normalisasiBobot || "0").toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Tahapan Metode SMART
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Langkah-langkah perhitungan yang dilakukan
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <ol className="list-inside list-decimal space-y-2 text-xs sm:text-sm">
              <li>Menentukan kriteria dan bobot penilaian</li>
              <li>Normalisasi bobot kriteria (Wj / Sigma Wj)</li>
              <li>Input nilai setiap alternatif pada setiap kriteria</li>
              <li>Normalisasi nilai utility setiap kriteria</li>
              <li>Perhitungan nilai akhir (U = Sigma Wj x Uj)</li>
              <li>Perangkingan berdasarkan nilai akhir tertinggi</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">
            Tabel Nilai Alternatif
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Data nilai mentah setiap karyawan pada setiap kriteria
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4 sm:pl-0">Kode</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Departemen
                  </TableHead>
                  <TableHead className="text-center">K1</TableHead>
                  <TableHead className="text-center">K2</TableHead>
                  <TableHead className="hidden text-center sm:table-cell">
                    K3
                  </TableHead>
                  <TableHead className="hidden pr-4 text-center sm:table-cell sm:pr-0">
                    K4
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoreList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-sm">
                      Belum ada data nilai. Silakan input nilai di halaman
                      Pembobotan.
                    </TableCell>
                  </TableRow>
                ) : (
                  scoreList.map(({ score, employee }) => (
                    <TableRow key={score.id}>
                      <TableCell className="pl-4 sm:pl-0">
                        <Badge variant="outline" className="text-xs">
                          {employee.kodeAlternatif}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[80px] truncate font-medium text-xs sm:max-w-none sm:text-sm">
                        {employee.namaLengkap}
                      </TableCell>
                      <TableCell className="hidden text-xs sm:text-sm md:table-cell">
                        {employee.departemen}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        {score.k1Score}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        {score.k2Score}
                      </TableCell>
                      <TableCell className="hidden text-center text-xs sm:table-cell sm:text-sm">
                        {score.k3Score}
                      </TableCell>
                      <TableCell className="hidden pr-4 text-center text-xs sm:table-cell sm:pr-0 sm:text-sm">
                        {score.k4Score}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {scoreList.some((s) => s.score.totalScore) && (
        <>
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">
                Tabel Normalisasi Nilai
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Hasil normalisasi nilai (0-1) untuk setiap kriteria
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4 sm:pl-0">Kode</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead className="text-center">K1</TableHead>
                      <TableHead className="text-center">K2</TableHead>
                      <TableHead className="hidden text-center sm:table-cell">
                        K3
                      </TableHead>
                      <TableHead className="hidden pr-4 text-center sm:table-cell sm:pr-0">
                        K4
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scoreList.map(({ score, employee }) => (
                      <TableRow key={score.id}>
                        <TableCell className="pl-4 sm:pl-0">
                          <Badge variant="outline" className="text-xs">
                            {employee.kodeAlternatif}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[80px] truncate font-medium text-xs sm:max-w-none sm:text-sm">
                          {employee.namaLengkap}
                        </TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">
                          {parseFloat(score.k1Normalized || "0").toFixed(4)}
                        </TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">
                          {parseFloat(score.k2Normalized || "0").toFixed(4)}
                        </TableCell>
                        <TableCell className="hidden text-center text-xs sm:table-cell sm:text-sm">
                          {parseFloat(score.k3Normalized || "0").toFixed(4)}
                        </TableCell>
                        <TableCell className="hidden pr-4 text-center text-xs sm:table-cell sm:pr-0 sm:text-sm">
                          {parseFloat(score.k4Normalized || "0").toFixed(4)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">
                Hasil Perhitungan SMART
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Nilai akhir dan peringkat karyawan
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4 text-center sm:pl-0">
                        Rank
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Kode
                      </TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Departemen
                      </TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="pr-4 text-center sm:pr-0">
                        Grade
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...scoreList]
                      .sort(
                        (a, b) =>
                          (a.score.ranking || 0) - (b.score.ranking || 0),
                      )
                      .map(({ score, employee }) => (
                        <TableRow key={score.id}>
                          <TableCell className="pl-4 text-center font-bold text-xs sm:pl-0 sm:text-sm">
                            #{score.ranking}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline" className="text-xs">
                              {employee.kodeAlternatif}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[80px] truncate font-medium text-xs sm:max-w-none sm:text-sm">
                            {employee.namaLengkap}
                          </TableCell>
                          <TableCell className="hidden text-xs sm:text-sm md:table-cell">
                            {employee.departemen}
                          </TableCell>
                          <TableCell className="text-center font-semibold text-xs sm:text-sm">
                            {parseFloat(score.totalScore || "0").toFixed(4)}
                          </TableCell>
                          <TableCell className="pr-4 text-center sm:pr-0">
                            <Badge
                              variant={
                                score.grade === "sangat_baik"
                                  ? "default"
                                  : score.grade === "baik"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className="text-[10px] sm:text-xs"
                            >
                              {score.grade === "sangat_baik"
                                ? "Sangat Baik"
                                : score.grade === "baik"
                                  ? "Baik"
                                  : "Kurang"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
