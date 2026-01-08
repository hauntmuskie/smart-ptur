import { eq } from "drizzle-orm";
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
import { db } from "@/db";
import { criteria, employees, periods, scores } from "@/db/schema";

function formatNumber(value: string | null): string {
  if (!value) return "0";
  const num = Number.parseFloat(value);
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
}

async function getData() {
  const [activePeriod] = await db
    .select()
    .from(periods)
    .where(eq(periods.status, "active"))
    .limit(1);

  if (!activePeriod) {
    return { activePeriod: null, scoreList: [], criteriaList: [] };
  }

  const scoreList = await db
    .select({
      score: scores,
      employee: employees,
    })
    .from(scores)
    .innerJoin(employees, eq(scores.employeeId, employees.id))
    .where(eq(scores.periodId, activePeriod.id))
    .orderBy(employees.kodeAlternatif);

  const criteriaList = await db.select().from(criteria).orderBy(criteria.kode);

  return { activePeriod, scoreList, criteriaList };
}

export default async function NilaiUtilityPage() {
  const { activePeriod, scoreList, criteriaList } = await getData();

  if (!activePeriod) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
            Nilai Utility
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Perhitungan nilai utility untuk setiap kriteria
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

  const hasCalculation = scoreList.some((s) => s.score.totalScore);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
          Nilai Utility
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Perhitungan nilai utility - Periode: {activePeriod.name}
        </p>
      </div>

      {hasCalculation ? (
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Tabel Nilai Utility
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Hasil perhitungan nilai utility: Ui(ai) = 100 x (nilai - 0) / (100
              - 0)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4 sm:pl-0">Kode</TableHead>
                    <TableHead>Nama</TableHead>
                    {criteriaList.map((c) => (
                      <TableHead key={c.id} className="text-center">
                        Ui({c.kode})
                      </TableHead>
                    ))}
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
                        {formatNumber(score.k1Utility)}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        {formatNumber(score.k2Utility)}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        {formatNumber(score.k3Utility)}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        {formatNumber(score.k4Utility)}
                      </TableCell>
                      <TableCell className="pr-4 text-center text-xs sm:pr-0 sm:text-sm">
                        {formatNumber(score.k5Utility)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground text-sm">
              Belum ada data perhitungan. Silakan lakukan perhitungan terlebih
              dahulu di halaman Proses Perhitungan.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
