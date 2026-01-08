"use client";

import { Calculator } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { runSMARTCalculation } from "@/app/_actions/calculation";
import { Button } from "@/components/ui/button";

export function CalculationButton() {
  const [isCalculating, setIsCalculating] = useState(false);
  const router = useRouter();

  async function handleCalculate() {
    setIsCalculating(true);
    const result = await runSMARTCalculation();
    setIsCalculating(false);

    if (result.success) {
      toast.success(result.message);
      router.push("/perhitungan/hasil");
    } else {
      toast.error(result.message);
    }
  }

  return (
    <Button onClick={handleCalculate} disabled={isCalculating}>
      <Calculator className="mr-2 h-4 w-4" />
      {isCalculating ? "Menghitung..." : "Proses Perhitungan SMART"}
    </Button>
  );
}
