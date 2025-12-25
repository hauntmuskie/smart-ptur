"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface FormDialogState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export function useFormDialog<T extends FormDialogState>(
  action: (state: Awaited<T>, formData: FormData) => Promise<T>,
  initialState: Awaited<T>,
) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      toast.success(state.message);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return {
    open,
    setOpen,
    state,
    formAction,
    isPending,
  };
}
