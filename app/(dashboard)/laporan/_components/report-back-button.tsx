"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ReportBackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => router.back()}
      className="print:hidden"
    >
      <ArrowLeft className="mr-2 size-4" />
      Kembali
    </Button>
  );
}
