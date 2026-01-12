import Image from "next/image";

interface ReportSignatureProps {
  date: Date;
  position: string;
  name: string;
}

function formatIndonesianDate(date: Date): string {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = days[date.getDay()];
  const dateNum = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `Jakarta, ${day} ${dateNum} ${month} ${year}`;
}

export function ReportSignature({
  date,
  position,
  name,
}: ReportSignatureProps) {
  return (
    <div className="mt-12 flex justify-end">
      <div className="w-64 text-center">
        <p className="text-sm">{formatIndonesianDate(date)}</p>
        <p className="mt-1 text-sm">Mengetahui,</p>
        <p className="font-medium text-[#1a365d] text-sm underline underline-offset-4">
          {position}
        </p>

        <div className="my-8 flex justify-center">
          <div className="relative flex size-20 items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
              <div className="size-full rounded-full border-2 border-[#1a365d]" />
            </div>
            <Image
              src="/penerbit-erlangga.png"
              alt="Stempel Penerbit Erlangga"
              width={80}
              height={80}
              className="size-16 object-contain opacity-70"
            />
          </div>
        </div>

        <p className="font-semibold text-sm underline underline-offset-4">
          {name}
        </p>
      </div>
    </div>
  );
}
