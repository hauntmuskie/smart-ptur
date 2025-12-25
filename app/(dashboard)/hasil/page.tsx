import { Award, Medal, Trophy } from "lucide-react";
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

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return null;
  }
}

function getGradeLabel(grade: string | null) {
  if (grade === "sangat_baik") return "Sangat Baik";
  if (grade === "baik") return "Baik";
  return "Kurang";
}

function getGradeVariant(grade: string | null) {
  if (grade === "sangat_baik") return "default";
  if (grade === "baik") return "secondary";
  return "destructive";
}

function NoPeriodCard() {
  return (
    <Card>
      <CardContent className="py-8">
        <p className="text-center text-muted-foreground">
          Belum ada periode evaluasi aktif.
        </p>
      </CardContent>
    </Card>
  );
}

function NoResultsCard({ periodName }: { periodName: string }) {
  return (
    <Card>
      <CardContent className="py-8">
        <p className="text-center text-muted-foreground">
          Belum ada hasil perhitungan untuk periode {periodName}.
          <br />
          Silakan lakukan proses perhitungan terlebih dahulu.
        </p>
      </CardContent>
    </Card>
  );
}

function ResultsContent({
  scoreList,
  winner,
  activePeriodName,
}: {
  scoreList: Awaited<ReturnType<typeof getData>>["scoreList"];
  winner:
    | Awaited<ReturnType<typeof getData>>["scoreList"][0]
    | null
    | undefined;
  activePeriodName: string;
}) {
  return (
    <>
      {winner && (
        <Card className="border-yellow-200 bg-linear-to-r from-yellow-50 to-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Karyawan Terbaik - {activePeriodName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                <Trophy className="h-10 w-10 text-yellow-500" />
              </div>
              <div>
                <h2 className="font-bold text-2xl">
                  {winner.employees.namaLengkap}
                </h2>
                <p className="text-muted-foreground">
                  {winner.employees.departemen} - {winner.employees.jabatan}
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <Badge variant="outline" className="text-lg">
                    {winner.employees.kodeAlternatif}
                  </Badge>
                  <span className="font-semibold">
                    Score:{" "}
                    {parseFloat(winner.scores.totalScore || "0").toFixed(4)}
                  </span>
                  <Badge
                    variant={
                      winner.scores.grade === "sangat_baik"
                        ? "default"
                        : winner.scores.grade === "baik"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {winner.scores.grade === "sangat_baik"
                      ? "Sangat Baik"
                      : winner.scores.grade === "baik"
                        ? "Baik"
                        : "Kurang"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Tabel Perangkingan Lengkap</CardTitle>
          <CardDescription>
            Hasil perhitungan metode SMART untuk semua karyawan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">Ranking</TableHead>
                <TableHead>Kode Alternatif</TableHead>
                <TableHead>Nama Karyawan</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead className="text-center">K1</TableHead>
                <TableHead className="text-center">K2</TableHead>
                <TableHead className="text-center">K3</TableHead>
                <TableHead className="text-center">K4</TableHead>
                <TableHead className="text-center">Total Score</TableHead>
                <TableHead className="text-center">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoreList.map(({ scores, employees }) => {
                const gradeVariant = getGradeVariant(scores.grade);
                const gradeLabel = getGradeLabel(scores.grade);

                return (
                  <TableRow
                    key={scores.id}
                    className={scores.ranking === 1 ? "bg-yellow-50" : ""}
                  >
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getRankIcon(scores.ranking || 0)}
                        <span className="font-bold text-lg">
                          #{scores.ranking}
                        </span>
                      </div>
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
                    <TableCell className="text-center font-semibold">
                      {parseFloat(scores.totalScore || "0").toFixed(4)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={gradeVariant}>{gradeLabel}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keterangan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Kriteria Penilaian</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>K1 - Kedisiplinan (25%)</li>
                <li>K2 - Kehadiran (25%)</li>
                <li>K3 - Prestasi (25%)</li>
                <li>K4 - Tanggung Jawab (25%)</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Kategori Grade</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="default">Sangat Baik</Badge>
                  <span className="text-muted-foreground">Score ≥ 0.90</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Baik</Badge>
                  <span className="text-muted-foreground">
                    Score 0.75 - 0.89
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="destructive">Kurang</Badge>
                  <span className="text-muted-foreground">Score &lt; 0.75</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default async function HasilPage() {
  const { activePeriod, scoreList } = await getData();

  if (!activePeriod) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Hasil Perangkingan
          </h1>
          <p className="text-muted-foreground">
            Hasil penentuan karyawan terbaik menggunakan metode SMART
          </p>
        </div>
        <NoPeriodCard />
      </div>
    );
  }

  const hasResults = scoreList.some((s) => s.scores.totalScore);
  const winner = hasResults
    ? scoreList.find((s) => s.scores.ranking === 1)
    : null;

  if (!hasResults) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Hasil Perangkingan
          </h1>
          <p className="text-muted-foreground">
            Hasil penentuan karyawan terbaik menggunakan metode SMART
          </p>
        </div>
        <NoResultsCard periodName={activePeriod.name} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">
          Hasil Perangkingan
        </h1>
        <p className="text-muted-foreground">
          Hasil penentuan karyawan terbaik menggunakan metode SMART
        </p>
      </div>
      <ResultsContent
        scoreList={scoreList}
        winner={winner}
        activePeriodName={activePeriod.name}
      />
    </div>
  );
}
