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
import type { criteria, employees, scores } from "@/db/schema";
import { getData } from "./_actions";
import { PeriodDialog } from "./_components/period-dialog";
import { ScoreForm } from "./_components/score-form";

function getGradeLabel(score: number): {
  label: string;
  variant: "default" | "secondary" | "outline" | "destructive";
} {
  if (score >= 90) return { label: "Sangat Baik", variant: "default" };
  if (score >= 80) return { label: "Baik", variant: "secondary" };
  if (score >= 66) return { label: "Cukup", variant: "outline" };
  return { label: "Buruk", variant: "destructive" };
}

function ScoreBadge({ scoreValue }: { scoreValue: string | null }) {
  if (!scoreValue) return <>-</>;

  const numValue = Number.parseFloat(scoreValue);
  const displayValue = numValue % 1 === 0 ? numValue.toString() : scoreValue;
  const grade = getGradeLabel(numValue);
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-semibold text-xs sm:text-sm">{displayValue}</span>
      <Badge variant={grade.variant} className="text-[10px] sm:text-xs">
        {grade.label}
      </Badge>
    </div>
  );
}

function EmployeeScoreRow({
  emp,
  empScore,
  activePeriodId,
}: {
  emp: typeof employees.$inferSelect;
  empScore: typeof scores.$inferSelect | undefined;
  criteriaList: (typeof criteria.$inferSelect)[];
  activePeriodId: number;
}) {
  return (
    <TableRow>
      <TableCell className="pl-4 sm:pl-0">
        <Badge variant="outline" className="text-xs">
          {emp.kodeAlternatif}
        </Badge>
      </TableCell>
      <TableCell className="max-w-[100px] truncate font-medium text-xs sm:max-w-none sm:text-sm">
        {emp.namaLengkap}
      </TableCell>
      <TableCell className="hidden text-xs sm:text-sm md:table-cell">
        {emp.departemen}
      </TableCell>
      <TableCell className="hidden text-center sm:table-cell">
        <ScoreBadge scoreValue={empScore?.k1Score ?? null} />
      </TableCell>
      <TableCell className="hidden text-center sm:table-cell">
        <ScoreBadge scoreValue={empScore?.k2Score ?? null} />
      </TableCell>
      <TableCell className="hidden text-center lg:table-cell">
        <ScoreBadge scoreValue={empScore?.k3Score ?? null} />
      </TableCell>
      <TableCell className="hidden text-center lg:table-cell">
        <ScoreBadge scoreValue={empScore?.k4Score ?? null} />
      </TableCell>
      <TableCell className="hidden text-center xl:table-cell">
        <ScoreBadge scoreValue={empScore?.k5Score ?? null} />
      </TableCell>
      <TableCell className="pr-4 text-center sm:pr-0">
        <ScoreForm
          employee={emp}
          periodId={activePeriodId}
          existingScore={empScore}
        />
      </TableCell>
    </TableRow>
  );
}

export default async function PembobotanPage() {
  const { activePeriod, employeeList, criteriaList, scoreList } =
    await getData();

  const scoreMap = new Map(scoreList.map((s) => [s.employeeId, s]));

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
            Pembobotan Kriteria
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Input nilai kriteria untuk setiap karyawan
          </p>
        </div>
        <PeriodDialog />
      </div>

      {!activePeriod ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground text-sm">
              Belum ada periode aktif. Silakan buat periode baru terlebih
              dahulu.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">
                Periode Aktif
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {activePeriod.name} ({activePeriod.bulan}/{activePeriod.tahun})
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">
                Tabel Nilai Bobot Kriteria
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Skala penilaian: Sangat Baik (90-100), Baik (80-89), Cukup
                (66-79), Buruk (&lt;65)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] pl-4 sm:pl-0">
                        Kode
                      </TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Departemen
                      </TableHead>
                      {criteriaList.slice(0, 2).map((c) => (
                        <TableHead
                          key={c.id}
                          className="hidden text-center sm:table-cell"
                        >
                          <span className="text-xs sm:text-sm">{c.kode}</span>
                          <br />
                          <span className="font-normal text-[10px] text-muted-foreground sm:text-xs">
                            {c.nama}
                          </span>
                        </TableHead>
                      ))}
                      {criteriaList.slice(2, 4).map((c) => (
                        <TableHead
                          key={c.id}
                          className="hidden text-center lg:table-cell"
                        >
                          <span className="text-xs sm:text-sm">{c.kode}</span>
                          <br />
                          <span className="font-normal text-[10px] text-muted-foreground sm:text-xs">
                            {c.nama}
                          </span>
                        </TableHead>
                      ))}
                      {criteriaList.slice(4).map((c) => (
                        <TableHead
                          key={c.id}
                          className="hidden text-center xl:table-cell"
                        >
                          <span className="text-xs sm:text-sm">{c.kode}</span>
                          <br />
                          <span className="font-normal text-[10px] text-muted-foreground sm:text-xs">
                            {c.nama}
                          </span>
                        </TableHead>
                      ))}
                      <TableHead className="pr-4 text-center sm:pr-0">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeList.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4 + criteriaList.length}
                          className="py-8 text-center text-sm"
                        >
                          Belum ada data karyawan
                        </TableCell>
                      </TableRow>
                    ) : (
                      employeeList.map((emp) => (
                        <EmployeeScoreRow
                          key={emp.id}
                          emp={emp}
                          empScore={scoreMap.get(emp.id)}
                          criteriaList={criteriaList}
                          activePeriodId={activePeriod.id}
                        />
                      ))
                    )}
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
