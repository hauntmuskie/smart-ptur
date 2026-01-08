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

function formatNumber(value: string | null): string {
  if (!value) return "0";
  const num = Number.parseFloat(value);
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="size-4 text-yellow-500 sm:size-5" />;
    case 2:
      return <Medal className="size-4 text-gray-400 sm:size-5" />;
    case 3:
      return <Award className="size-4 text-amber-600 sm:size-5" />;
    default:
      return null;
  }
}

function getGradeLabel(grade: string | null) {
  if (grade === "sangat_baik") return "Sangat Baik";
  if (grade === "baik") return "Baik";
  if (grade === "cukup") return "Cukup";
  return "Buruk";
}

function getGradeVariant(grade: string | null) {
  if (grade === "sangat_baik") return "default";
  if (grade === "baik") return "secondary";
  if (grade === "cukup") return "outline";
  return "destructive";
}

function NoResultsCard() {
  return (
    <Card>
      <CardContent className="py-8">
        <p className="text-center text-muted-foreground text-sm">
          Belum ada hasil perhitungan.
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
}: {
  scoreList: Awaited<ReturnType<typeof getData>>["scoreList"];
  winner:
    | Awaited<ReturnType<typeof getData>>["scoreList"][0]
    | null
    | undefined;
}) {
  return (
    <>
      {winner && (
        <Card className="border-yellow-200 bg-linear-to-br from-yellow-50 to-amber-50 dark:border-yellow-900/50 dark:from-yellow-950/20 dark:to-amber-950/20">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Trophy className="size-5 text-yellow-500 sm:size-6" />
              <span className="truncate">Karyawan Terbaik</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="mx-auto flex size-16 shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:size-20 dark:bg-yellow-900/30">
                <Trophy className="size-8 text-yellow-500 sm:size-10" />
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <h2 className="truncate font-bold text-xl sm:text-2xl">
                  {winner.employee.namaLengkap}
                </h2>
                <p className="truncate text-muted-foreground text-sm">
                  {winner.employee.departemen} - {winner.employee.jabatan}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-4">
                  <Badge variant="outline" className="text-sm sm:text-lg">
                    {winner.employee.kodeAlternatif}
                  </Badge>
                  <span className="font-semibold text-sm sm:text-base">
                    Score: {formatNumber(winner.score.totalScore)}
                  </span>
                  <Badge
                    variant={
                      winner.score.grade === "sangat_baik"
                        ? "default"
                        : winner.score.grade === "baik"
                          ? "secondary"
                          : winner.score.grade === "cukup"
                            ? "outline"
                            : "destructive"
                    }
                    className="text-xs sm:text-sm"
                  >
                    {getGradeLabel(winner.score.grade)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">
            Tabel Perangkingan Lengkap
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Hasil perhitungan metode SMART untuk semua karyawan
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] pl-4 text-center sm:w-[100px] sm:pl-0">
                    Ranking
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Kode</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Departemen
                  </TableHead>
                  <TableHead className="hidden text-center lg:table-cell">
                    K1
                  </TableHead>
                  <TableHead className="hidden text-center lg:table-cell">
                    K2
                  </TableHead>
                  <TableHead className="hidden text-center xl:table-cell">
                    K3
                  </TableHead>
                  <TableHead className="hidden text-center xl:table-cell">
                    K4
                  </TableHead>
                  <TableHead className="hidden text-center xl:table-cell">
                    K5
                  </TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead className="pr-4 text-center sm:pr-0">
                    Grade
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoreList.map(({ score, employee }) => {
                  const gradeVariant = getGradeVariant(score.grade);
                  const gradeLabel = getGradeLabel(score.grade);

                  return (
                    <TableRow
                      key={score.id}
                      className={
                        score.ranking === 1
                          ? "bg-yellow-50 dark:bg-yellow-950/20"
                          : ""
                      }
                    >
                      <TableCell className="pl-4 text-center sm:pl-0">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          {getRankIcon(score.ranking || 0)}
                          <span className="font-bold text-sm sm:text-lg">
                            #{score.ranking}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs">
                          {employee.kodeAlternatif}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[100px] truncate font-medium text-xs sm:max-w-none sm:text-sm">
                        {employee.namaLengkap}
                      </TableCell>
                      <TableCell className="hidden text-xs sm:text-sm md:table-cell">
                        {employee.departemen}
                      </TableCell>
                      <TableCell className="hidden text-center text-xs sm:text-sm lg:table-cell">
                        {formatNumber(score.k1Score)}
                      </TableCell>
                      <TableCell className="hidden text-center text-xs sm:text-sm lg:table-cell">
                        {formatNumber(score.k2Score)}
                      </TableCell>
                      <TableCell className="hidden text-center text-xs sm:text-sm xl:table-cell">
                        {formatNumber(score.k3Score)}
                      </TableCell>
                      <TableCell className="hidden text-center text-xs sm:text-sm xl:table-cell">
                        {formatNumber(score.k4Score)}
                      </TableCell>
                      <TableCell className="hidden text-center text-xs sm:text-sm xl:table-cell">
                        {formatNumber(score.k5Score)}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-xs sm:text-sm">
                        {formatNumber(score.totalScore)}
                      </TableCell>
                      <TableCell className="pr-4 text-center sm:pr-0">
                        <Badge
                          variant={gradeVariant}
                          className="text-[10px] sm:text-xs"
                        >
                          {gradeLabel}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Keterangan</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-3">
              <h4 className="mb-2 font-semibold text-xs sm:text-sm">
                Kriteria Penilaian
              </h4>
              <ul className="space-y-1 text-muted-foreground text-xs sm:text-sm">
                <li>K1 - Kinerja (25%)</li>
                <li>K2 - Kedisiplinan (25%)</li>
                <li>K3 - Inisiatif & Kreativitas (20%)</li>
                <li>K4 - Tanggung Jawab (15%)</li>
                <li>K5 - Kerja Sama Tim (15%)</li>
              </ul>
            </div>
            <div className="rounded-lg border p-3">
              <h4 className="mb-2 font-semibold text-xs sm:text-sm">
                Kategori Grade
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex flex-wrap items-center gap-2">
                  <Badge variant="default" className="text-[10px] sm:text-xs">
                    Sangat Baik
                  </Badge>
                  <span className="text-muted-foreground">Score &gt;= 90</span>
                </li>
                <li className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] sm:text-xs">
                    Baik
                  </Badge>
                  <span className="text-muted-foreground">Score 80 - 89</span>
                </li>
                <li className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-[10px] sm:text-xs">
                    Cukup
                  </Badge>
                  <span className="text-muted-foreground">Score 66 - 79</span>
                </li>
                <li className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="destructive"
                    className="text-[10px] sm:text-xs"
                  >
                    Buruk
                  </Badge>
                  <span className="text-muted-foreground">Score &lt; 65</span>
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
  const { scoreList } = await getData();

  const hasResults = scoreList.some((s) => s.score.totalScore);
  const winner = hasResults
    ? scoreList.find((s) => s.score.ranking === 1)
    : null;

  if (!hasResults) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
            Hasil Perangkingan
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Hasil penentuan karyawan terbaik menggunakan metode SMART
          </p>
        </div>
        <NoResultsCard />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
          Hasil Perangkingan
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Hasil penentuan karyawan terbaik menggunakan metode SMART
        </p>
      </div>
      <ResultsContent scoreList={scoreList} winner={winner} />
    </div>
  );
}
