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
  variant: "default" | "secondary" | "destructive";
} {
  if (score >= 90) return { label: "Sangat Baik", variant: "default" };
  if (score >= 75) return { label: "Baik", variant: "secondary" };
  return { label: "Kurang", variant: "destructive" };
}

function ScoreBadge({ scoreValue }: { scoreValue: string | null }) {
  if (!scoreValue) return <>-</>;

  const grade = getGradeLabel(parseFloat(scoreValue));
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-semibold">{scoreValue}</span>
      <Badge variant={grade.variant} className="text-xs">
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
      <TableCell>
        <Badge variant="outline">{emp.kodeAlternatif}</Badge>
      </TableCell>
      <TableCell className="font-medium">{emp.namaLengkap}</TableCell>
      <TableCell>{emp.departemen}</TableCell>
      <TableCell className="text-center">
        <ScoreBadge scoreValue={empScore?.k1Score ?? null} />
      </TableCell>
      <TableCell className="text-center">
        <ScoreBadge scoreValue={empScore?.k2Score ?? null} />
      </TableCell>
      <TableCell className="text-center">
        <ScoreBadge scoreValue={empScore?.k3Score ?? null} />
      </TableCell>
      <TableCell className="text-center">
        <ScoreBadge scoreValue={empScore?.k4Score ?? null} />
      </TableCell>
      <TableCell className="text-center">
        <ScoreForm employee={emp} periodId={activePeriodId} />
      </TableCell>
    </TableRow>
  );
}

export default async function PembobotanPage() {
  const { activePeriod, employeeList, criteriaList, scoreList } =
    await getData();

  const scoreMap = new Map(scoreList.map((s) => [s.employeeId, s]));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Pembobotan Kriteria
          </h1>
          <p className="text-muted-foreground">
            Input nilai kriteria untuk setiap karyawan
          </p>
        </div>
        <PeriodDialog />
      </div>

      {!activePeriod ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              Belum ada periode aktif. Silakan buat periode baru terlebih
              dahulu.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Periode Aktif</CardTitle>
              <CardDescription>
                {activePeriod.name} ({activePeriod.bulan}/{activePeriod.tahun})
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tabel Nilai Bobot Kriteria</CardTitle>
              <CardDescription>
                Skala penilaian: Sangat Baik (90-100), Baik (75-89), Kurang
                (&lt;75)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Kode</TableHead>
                    <TableHead>Nama Alternatif</TableHead>
                    <TableHead>Departemen</TableHead>
                    {criteriaList.map((c) => (
                      <TableHead key={c.id} className="text-center">
                        {c.kode}
                        <br />
                        <span className="font-normal text-muted-foreground text-xs">
                          {c.nama}
                        </span>
                      </TableHead>
                    ))}
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeList.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4 + criteriaList.length}
                        className="py-8 text-center"
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
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
