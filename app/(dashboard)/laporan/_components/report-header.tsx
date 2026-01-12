import Image from "next/image";
import PenerbitErlanggaLogo from "@/public/penerbit-erlangga-cropped.png";

interface ReportHeaderProps {
  title: string;
}

export function ReportHeader({ title }: ReportHeaderProps) {
  return (
    <div className="border-[#1a365d] border-b-2 pb-4">
      <div className="flex items-center gap-4">
        <Image
          src={PenerbitErlanggaLogo}
          alt="Logo Penerbit Erlangga"
          width={100}
          height={50}
          className="h-auto w-auto shrink-0 items-center"
          quality={100}
          priority
        />
        <div className="min-w-0 flex-1 text-center">
          <h1 className="font-bold text-[#1a365d] text-lg uppercase">
            PT Penerbit Erlangga
          </h1>
          <p className="text-[10px] text-gray-600">
            Ruko Cibarusah, KM.40 South Cikarang Jl. Raya Cikarang - Cibarusah
          </p>
          <p className="text-[10px] text-gray-600">
            Blok B1 No.1, Pasirsari, Cikarang Selatan, Bekasi Regency, West Java
            17530
          </p>
          <p className="text-[10px] text-gray-600">
            Telp. (021) 8710024 - 8717024 | Fax. (021) 8726749 | E-mail:
            info@erlangga.co.id
          </p>
        </div>
        <div className="w-[100px] shrink-0" />
      </div>
      <div className="mt-6 text-center">
        <h2 className="font-bold text-[#1a365d] text-xl italic underline underline-offset-4">
          {title}
        </h2>
      </div>
    </div>
  );
}
