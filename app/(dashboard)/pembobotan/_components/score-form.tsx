"use client";

import { Pencil, Plus } from "lucide-react";
import Form from "next/form";
import { useState } from "react";
import { toast } from "sonner";
import { upsertScore } from "@/app/_actions/scores";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Employee, Score } from "@/db/schema";

interface ScoreFormProps {
  employee: Employee;
  existingScore?: Score;
}

export function ScoreForm({ employee, existingScore }: ScoreFormProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await upsertScore(employee.id, formData);
    setIsPending(false);

    if (result.success) {
      toast.success(result.message);
      setOpen(false);
    } else {
      toast.error(result.message || "Gagal menyimpan nilai");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {existingScore ? (
            <>
              <Pencil className="mr-1.5 h-4 w-4" />
              Ubah
            </>
          ) : (
            <>
              <Plus className="mr-1.5 h-4 w-4" />
              Input Nilai
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Input Nilai - {employee.namaLengkap}</DialogTitle>
        </DialogHeader>
        <Form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="k1Score">K1 - Kinerja (0-100)</Label>
              <Input
                id="k1Score"
                name="k1Score"
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                defaultValue={existingScore?.k1Score || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="k2Score">K2 - Kedisiplinan (0-100)</Label>
              <Input
                id="k2Score"
                name="k2Score"
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                defaultValue={existingScore?.k2Score || ""}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="k3Score">
                K3 - Inisiatif & Kreativitas (0-100)
              </Label>
              <Input
                id="k3Score"
                name="k3Score"
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                defaultValue={existingScore?.k3Score || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="k4Score">K4 - Tanggung Jawab (0-100)</Label>
              <Input
                id="k4Score"
                name="k4Score"
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                defaultValue={existingScore?.k4Score || ""}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="k5Score">K5 - Kerja Sama Tim (0-100)</Label>
            <Input
              id="k5Score"
              name="k5Score"
              type="number"
              min="0"
              max="100"
              placeholder="0-100"
              defaultValue={existingScore?.k5Score || ""}
            />
          </div>

          <div className="rounded-lg bg-muted p-3 text-sm">
            <p className="font-medium">Skala Penilaian:</p>
            <ul className="mt-1 text-muted-foreground">
              <li>Sangat Baik: 90 - 100</li>
              <li>Baik: 80 - 89</li>
              <li>Cukup: 66 - 79</li>
              <li>Buruk: &lt; 65</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
