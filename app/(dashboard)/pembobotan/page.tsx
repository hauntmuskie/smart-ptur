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
import { PeriodDialog } from "./period-dialog";
import { ScoreForm } from "./score-form";

function getGradeLabel(score: number): {
  label: string;
  variant: "default" | "secondary" | "destructive";
} {
  if (score >= 90) return { label: "Sangat Baik", variant: "default" };
  if (score >= 75) return { label: "Baik", variant: "secondary" };
  return { label: "Kurang", variant: "destructive" };
}

async function getData() {
  const [activePeriod] = await db
    .select()
    .from(periods)
    .where(eq(periods.status, "active"))
    .limit(1);

  const employeeList = await db
    .select()
    .from(employees)
    .orderBy(employees.kodeAlternatif);
  const criteriaList = await db.select().from(criteria).orderBy(criteria.kode);

  let scoreList: (typeof scores.$inferSelect)[] = [];
  if (activePeriod) {
    scoreList = await db
      .select()
      .from(scores)
      .where(eq(scores.periodId, activePeriod.id));
  }

  return { activePeriod, employeeList, criteriaList, scoreList };
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
                    employeeList.map((emp) => {
                      const empScore = scoreMap.get(emp.id);
                      return (
                        <TableRow key={emp.id}>
                          <TableCell>
                            <Badge variant="outline">
                              {emp.kodeAlternatif}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {emp.namaLengkap}
                          </TableCell>
                          <TableCell>{emp.departemen}</TableCell>
                          <TableCell className="text-center">
                            {empScore?.k1Score ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="font-semibold">
                                  {empScore.k1Score}
                                </span>
                                <Badge
                                  variant={
                                    getGradeLabel(parseFloat(empScore.k1Score))
                                      .variant
                                  }
                                  className="text-xs"
                                >
                                  {
                                    getGradeLabel(parseFloat(empScore.k1Score))
                                      .label
                                  }
                                </Badge>
                              </div>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {empScore?.k2Score ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="font-semibold">
                                  {empScore.k2Score}
                                </span>
                                <Badge
                                  variant={
                                    getGradeLabel(parseFloat(empScore.k2Score))
                                      .variant
                                  }
                                  className="text-xs"
                                >
                                  {
                                    getGradeLabel(parseFloat(empScore.k2Score))
                                      .label
                                  }
                                </Badge>
                              </div>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {empScore?.k3Score ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="font-semibold">
                                  {empScore.k3Score}
                                </span>
                                <Badge
                                  variant={
                                    getGradeLabel(parseFloat(empScore.k3Score))
                                      .variant
                                  }
                                  className="text-xs"
                                >
                                  {
                                    getGradeLabel(parseFloat(empScore.k3Score))
                                      .label
                                  }
                                </Badge>
                              </div>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {empScore?.k4Score ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="font-semibold">
                                  {empScore.k4Score}
                                </span>
                                <Badge
                                  variant={
                                    getGradeLabel(parseFloat(empScore.k4Score))
                                      .variant
                                  }
                                  className="text-xs"
                                >
                                  {
                                    getGradeLabel(parseFloat(empScore.k4Score))
                                      .label
                                  }
                                </Badge>
                              </div>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <ScoreForm
                              employee={emp}
                              periodId={activePeriod.id}
                              existingScore={empScore}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
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
