import { deleteEmployee } from "@/app/_actions/employees";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";

interface DeleteEmployeeButtonProps {
  id: number;
  name: string;
}

export function DeleteEmployeeButton({ id, name }: DeleteEmployeeButtonProps) {
  return (
    <DeleteConfirmationDialog
      id={id}
      itemName={name}
      entityType="Data Karyawan"
      deleteAction={deleteEmployee}
    />
  );
}
