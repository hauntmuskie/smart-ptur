"use client";

import { Pencil, Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  type CriteriaState,
  createCriteria,
  updateCriteria,
} from "@/app/_actions/criteria";
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
import type { Criteria } from "@/db/schema";

interface CriteriaDialogProps {
  mode: "create" | "edit";
  criteria?: Criteria;
}

export function CriteriaDialog({
  mode,
  criteria: criteriaData,
}: CriteriaDialogProps) {
  const [open, setOpen] = useState(false);
  const initialState: CriteriaState = {};

  const actionFn =
    mode === "edit" && criteriaData
      ? updateCriteria.bind(null, criteriaData.id)
      : createCriteria;

  const [state, formAction, isPending] = useActionState(actionFn, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      toast.success(state.message);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kriteria
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Tambah Kriteria" : "Edit Kriteria"}
          </DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kode">Kode Kriteria</Label>
              <Input
                id="kode"
                name="kode"
                placeholder="K1"
                defaultValue={criteriaData?.kode}
              />
              {state.errors?.kode && (
                <p className="text-red-500 text-sm">{state.errors.kode[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bobot">Bobot (%)</Label>
              <Input
                id="bobot"
                name="bobot"
                type="number"
                placeholder="25"
                defaultValue={criteriaData?.bobot}
              />
              {state.errors?.bobot && (
                <p className="text-red-500 text-sm">{state.errors.bobot[0]}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nama">Nama Kriteria</Label>
            <Input
              id="nama"
              name="nama"
              placeholder="Disiplin"
              defaultValue={criteriaData?.nama}
            />
            {state.errors?.nama && (
              <p className="text-red-500 text-sm">{state.errors.nama[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="keterangan">Keterangan</Label>
            <Input
              id="keterangan"
              name="keterangan"
              placeholder="Deskripsi kriteria"
              defaultValue={criteriaData?.keterangan || ""}
            />
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
