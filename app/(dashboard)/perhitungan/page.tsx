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
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Proses Perhitungan
          </h1>
          <p className="text-muted-foreground">
            Perhitungan metode SMART untuk menentukan karyawan terbaik
          </p>
        </div>
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              Belum ada periode aktif. Silakan buat periode di halaman
              Pembobotan.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Proses Perhitungan
          </h1>
          <p className="text-muted-foreground">
            Perhitungan metode SMART - Periode: {activePeriod.name}
          </p>
        </div>
        <CalculationButton periodId={activePeriod.id} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bobot Kriteria</CardTitle>
            <CardDescription>
              Normalisasi bobot yang digunakan dalam perhitungan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Kriteria</TableHead>
                  <TableHead className="text-center">Bobot</TableHead>
                  <TableHead className="text-center">Normalisasi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {criteriaList.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <Badge variant="outline">{c.kode}</Badge>
                    </TableCell>
                    <TableCell>{c.nama}</TableCell>
                    <TableCell className="text-center">{c.bobot}%</TableCell>
                    <TableCell className="text-center">
                      {parseFloat(c.normalisasiBobot || "0").toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tahapan Metode SMART</CardTitle>
            <CardDescription>
              Langkah-langkah perhitungan yang dilakukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-2 text-sm">
              <li>Menentukan kriteria dan bobot penilaian</li>
              <li>Normalisasi bobot kriteria (Wj / ΣWj)</li>
              <li>Input nilai setiap alternatif pada setiap kriteria</li>
              <li>Normalisasi nilai utility setiap kriteria</li>
              <li>Perhitungan nilai akhir (U = Σ Wj × Uj)</li>
              <li>Perangkingan berdasarkan nilai akhir tertinggi</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tabel Nilai Alternatif</CardTitle>
          <CardDescription>
            Data nilai mentah setiap karyawan pada setiap kriteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama Alternatif</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead className="text-center">K1</TableHead>
                <TableHead className="text-center">K2</TableHead>
                <TableHead className="text-center">K3</TableHead>
                <TableHead className="text-center">K4</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoreList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center">
                    Belum ada data nilai. Silakan input nilai di halaman
                    Pembobotan.
                  </TableCell>
                </TableRow>
              ) : (
                scoreList.map(({ scores, employees }) => (
                  <TableRow key={scores.id}>
                    <TableCell>
                      <Badge variant="outline">
                        {employees.kodeAlternatif}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {employees.namaLengkap}
                    </TableCell>
                    <TableCell>{employees.departemen}</TableCell>
                    <TableCell className="text-center">
                      {scores.k1Score}
                    </TableCell>
                    <TableCell className="text-center">
                      {scores.k2Score}
                    </TableCell>
                    <TableCell className="text-center">
                      {scores.k3Score}
                    </TableCell>
                    <TableCell className="text-center">
                      {scores.k4Score}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {scoreList.some((s) => s.scores.totalScore) && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Tabel Normalisasi Nilai</CardTitle>
              <CardDescription>
                Hasil normalisasi nilai (0-1) untuk setiap kriteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead className="text-center">K1 Norm</TableHead>
                    <TableHead className="text-center">K2 Norm</TableHead>
                    <TableHead className="text-center">K3 Norm</TableHead>
                    <TableHead className="text-center">K4 Norm</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scoreList.map(({ scores, employees }) => (
                    <TableRow key={scores.id}>
                      <TableCell>
                        <Badge variant="outline">
                          {employees.kodeAlternatif}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {employees.namaLengkap}
                      </TableCell>
                      <TableCell className="text-center">
                        {parseFloat(scores.k1Normalized || "0").toFixed(4)}
                      </TableCell>
                      <TableCell className="text-center">
                        {parseFloat(scores.k2Normalized || "0").toFixed(4)}
                      </TableCell>
                      <TableCell className="text-center">
                        {parseFloat(scores.k3Normalized || "0").toFixed(4)}
                      </TableCell>
                      <TableCell className="text-center">
                        {parseFloat(scores.k4Normalized || "0").toFixed(4)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hasil Perhitungan SMART</CardTitle>
              <CardDescription>
                Nilai akhir dan peringkat karyawan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Ranking</TableHead>
                    <TableHead>Kode</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Departemen</TableHead>
                    <TableHead className="text-center">Total Score</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...scoreList]
                    .sort(
                      (a, b) =>
                        (a.scores.ranking || 0) - (b.scores.ranking || 0),
                    )
                    .map(({ scores, employees }) => (
                      <TableRow key={scores.id}>
                        <TableCell className="text-center font-bold">
                          #{scores.ranking}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {employees.kodeAlternatif}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {employees.namaLengkap}
                        </TableCell>
                        <TableCell>{employees.departemen}</TableCell>
                        <TableCell className="text-center font-semibold">
                          {parseFloat(scores.totalScore || "0").toFixed(4)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={
                              scores.grade === "sangat_baik"
                                ? "default"
                                : scores.grade === "baik"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {scores.grade === "sangat_baik"
                              ? "Sangat Baik"
                              : scores.grade === "baik"
                                ? "Baik"
                                : "Kurang"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
