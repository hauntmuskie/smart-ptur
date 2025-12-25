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
import { db } from "@/db";
import { criteria } from "@/db/schema";
import { CriteriaDialog } from "./criteria-dialog";
import { DeleteCriteriaButton } from "./delete-button";

async function getCriteria() {
  return db.select().from(criteria).orderBy(criteria.kode);
}

export default async function KriteriaPage() {
  const criteriaList = await getCriteria();
  const totalBobot = criteriaList.reduce(
    (sum, c) => sum + parseFloat(c.bobot || "0"),
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Kriteria & Bobot
          </h1>
          <p className="text-muted-foreground">
            Kelola kriteria penilaian dan bobot untuk metode SMART
          </p>
        </div>
        <CriteriaDialog mode="create" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tabel Kriteria dan Bobot</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode Kriteria</TableHead>
                  <TableHead>Kriteria</TableHead>
                  <TableHead className="text-center">Bobot</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {criteriaList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center">
                      Belum ada data kriteria
                    </TableCell>
                  </TableRow>
                ) : (
                  criteriaList.map((crit) => (
                    <TableRow key={crit.id}>
                      <TableCell>
                        <Badge variant="outline">{crit.kode}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{crit.nama}</TableCell>
                      <TableCell className="text-center">
                        {crit.bobot}%
                      </TableCell>
                      <TableCell className="space-x-2 text-right">
                        <CriteriaDialog mode="edit" criteria={crit} />
                        <DeleteCriteriaButton id={crit.id} name={crit.nama} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {criteriaList.length > 0 && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={2} className="font-semibold">
                      Total Bobot
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {totalBobot}%
                    </TableCell>
                    <TableCell />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tabel Normalisasi Bobot</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode Kriteria</TableHead>
                  <TableHead>Kriteria</TableHead>
                  <TableHead className="text-center">
                    Normalisasi Bobot
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {criteriaList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="py-8 text-center">
                      Belum ada data kriteria
                    </TableCell>
                  </TableRow>
                ) : (
                  criteriaList.map((crit) => (
                    <TableRow key={crit.id}>
                      <TableCell>
                        <Badge variant="outline">{crit.kode}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{crit.nama}</TableCell>
                      <TableCell className="text-center">
                        {parseFloat(crit.normalisasiBobot || "0").toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {criteriaList.length > 0 && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={2} className="font-semibold">
                      Total
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {criteriaList
                        .reduce(
                          (sum, c) =>
                            sum + parseFloat(c.normalisasiBobot || "0"),
                          0,
                        )
                        .toFixed(2)}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Keterangan Kriteria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {criteriaList.map((crit) => (
              <div key={crit.id} className="flex gap-3">
                <Badge variant="outline" className="shrink-0">
                  {crit.kode}
                </Badge>
                <div>
                  <p className="font-medium">{crit.nama}</p>
                  <p className="text-muted-foreground text-sm">
                    {crit.keterangan || "Tidak ada keterangan"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
