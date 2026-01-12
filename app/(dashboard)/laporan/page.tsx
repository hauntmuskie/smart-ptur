import { FileText } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const laporanItems = [
  {
    id: "karyawan",
    title: "Laporan Data Karyawan",
    description:
      "Cetak laporan lengkap data karyawan beserta informasi departemen dan jabatan",
    href: "/laporan/karyawan",
  },
  {
    id: "kriteria",
    title: "Laporan Data Kriteria",
    description:
      "Cetak laporan kriteria penilaian dan bobot yang digunakan dalam perhitungan SMART",
    href: "/laporan/kriteria",
  },
  {
    id: "utility",
    title: "Laporan Nilai Utility",
    description:
      "Cetak laporan hasil perhitungan nilai utility setiap karyawan pada setiap kriteria",
    href: "/laporan/utility",
  },
  {
    id: "hasil",
    title: "Laporan Nilai Akhir",
    description:
      "Cetak laporan hasil perangkingan karyawan terbaik beserta skor dan grade",
    href: "/laporan/hasil",
  },
];

export default function LaporanPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
          Laporan
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Cetak laporan hasil perhitungan SPK SMART
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {laporanItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <FileText className="size-5" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
