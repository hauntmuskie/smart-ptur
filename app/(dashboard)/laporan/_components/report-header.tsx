import Image from "next/image";

interface ReportHeaderProps {
  title: string;
}

export function ReportHeader({ title }: ReportHeaderProps) {
  return (
    <div className="border-[#1a365d] border-b-2 pb-4">
      <div className="flex items-start gap-4">
        <Image
          src="/penerbit-erlangga.png"
          alt="Logo Penerbit Erlangga"
          width={100}
          height={50}
          className="h-auto w-auto shrink-0"
          priority
        />
        <div className="min-w-0 flex-1 text-center">
          <h1 className="font-bold text-[#1a365d] text-lg uppercase">
            PT Penerbit Erlangga
          </h1>
          <p className="text-[10px] text-gray-600">
            Jl. H. Baping Raya No. 100, Ciracas, Jakarta Timur 13740
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
