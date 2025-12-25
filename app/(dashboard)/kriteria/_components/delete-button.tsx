import { deleteCriteria } from "@/app/_actions/criteria";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";

interface DeleteCriteriaButtonProps {
  id: number;
  name: string;
}

export function DeleteCriteriaButton({ id, name }: DeleteCriteriaButtonProps) {
  return (
    <DeleteConfirmationDialog
      id={id}
      itemName={name}
      entityType="Kriteria"
      deleteAction={deleteCriteria}
    />
  );
}
