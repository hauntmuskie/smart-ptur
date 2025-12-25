"use client";

import { Calculator } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { runSMARTCalculation } from "@/app/actions/calculation";
import { Button } from "@/components/ui/button";

interface CalculationButtonProps {
  periodId: number;
}

export function CalculationButton({ periodId }: CalculationButtonProps) {
  const [isCalculating, setIsCalculating] = useState(false);

  async function handleCalculate() {
    setIsCalculating(true);
    const result = await runSMARTCalculation(periodId);
    setIsCalculating(false);

    if (result.success) {
      toast.success(result.message);
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
