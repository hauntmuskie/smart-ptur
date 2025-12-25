import { Calculator, Scale, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStats } from "./_actions";

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Sistem Pendukung Keputusan Penentuan Karyawan Terbaik
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Total Karyawan
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.employees}</div>
            <p className="text-muted-foreground text-xs">Karyawan terdaftar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Jumlah Kriteria
            </CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.criteria}</div>
            <p className="text-muted-foreground text-xs">Kriteria penilaian</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Periode Aktif</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.period}</div>
            <p className="text-muted-foreground text-xs">Periode evaluasi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Data Nilai</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.scores}</div>
            <p className="text-muted-foreground text-xs">Karyawan dinilai</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tentang Metode SMART</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Simple Multi Attribute Rating Technique (SMART) adalah metode
            pengambilan keputusan yang sederhana, fleksibel, dan mudah
            diterapkan. Metode ini bekerja dengan memberikan bobot pada setiap
            kriteria sesuai tingkat kepentingannya, sehingga mampu menghasilkan
            penilaian yang objektif dan tepat dalam menentukan alternatif
            terbaik.
          </p>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="rounded-lg border p-3">
              <h4 className="font-semibold text-sm">Kriteria Penilaian</h4>
              <ul className="mt-1 space-y-1 text-muted-foreground text-sm">
                <li>K1 - Kedisiplinan (25%)</li>
                <li>K2 - Kehadiran (25%)</li>
                <li>K3 - Prestasi (25%)</li>
                <li>K4 - Tanggung Jawab (25%)</li>
              </ul>
            </div>
            <div className="rounded-lg border p-3">
              <h4 className="font-semibold text-sm">Skala Penilaian</h4>
              <ul className="mt-1 space-y-1 text-muted-foreground text-sm">
                <li>Sangat Baik: 90 - 100</li>
                <li>Baik: 75 - 89</li>
                <li>Kurang: &lt; 75</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
