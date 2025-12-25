"use client";

import { Pencil, Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createEmployee,
  type EmployeeState,
  updateEmployee,
} from "@/app/_actions/employees";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Employee } from "@/db/schema";

interface EmployeeDialogProps {
  mode: "create" | "edit";
  employee?: Employee;
}

export function EmployeeDialog({ mode, employee }: EmployeeDialogProps) {
  const [open, setOpen] = useState(false);
  const initialState: EmployeeState = {};

  const actionFn =
    mode === "edit" && employee
      ? updateEmployee.bind(null, employee.id)
      : createEmployee;

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
            Tambah Karyawan
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Tambah Data Karyawan" : "Edit Data Karyawan"}
          </DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kodeAlternatif">Kode Alternatif</Label>
              <Input
                id="kodeAlternatif"
                name="kodeAlternatif"
                placeholder="C1"
                defaultValue={employee?.kodeAlternatif}
              />
              {state.errors?.kodeAlternatif && (
                <p className="text-red-500 text-sm">
                  {state.errors.kodeAlternatif[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nik">NIK</Label>
              <Input
                id="nik"
                name="nik"
                placeholder="ERL001"
                defaultValue={employee?.nik}
              />
              {state.errors?.nik && (
                <p className="text-red-500 text-sm">{state.errors.nik[0]}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="namaLengkap">Nama Lengkap</Label>
            <Input
              id="namaLengkap"
              name="namaLengkap"
              placeholder="Nama lengkap karyawan"
              defaultValue={employee?.namaLengkap}
            />
            {state.errors?.namaLengkap && (
              <p className="text-red-500 text-sm">
                {state.errors.namaLengkap[0]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="barcode">Barcode</Label>
              <Input
                id="barcode"
                name="barcode"
                placeholder="BC001"
                defaultValue={employee?.barcode || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
              <Select name="jenisKelamin" defaultValue={employee?.jenisKelamin}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Laki-laki</SelectItem>
                  <SelectItem value="P">Perempuan</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.jenisKelamin && (
                <p className="text-red-500 text-sm">
                  {state.errors.jenisKelamin[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departemen">Departemen</Label>
              <Input
                id="departemen"
                name="departemen"
                placeholder="Marketing"
                defaultValue={employee?.departemen}
              />
              {state.errors?.departemen && (
                <p className="text-red-500 text-sm">
                  {state.errors.departemen[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="jabatan">Jabatan</Label>
              <Input
                id="jabatan"
                name="jabatan"
                placeholder="Staff Marketing"
                defaultValue={employee?.jabatan || ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tanggalBergabung">Tanggal Bergabung</Label>
            <Input
              id="tanggalBergabung"
              name="tanggalBergabung"
              type="date"
              defaultValue={
                employee?.tanggalBergabung?.toString().split("T")[0]
              }
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
