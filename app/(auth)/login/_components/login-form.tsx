"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useActionState } from "react";
import { type LoginState, login } from "@/app/_actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const initialState: LoginState = {};
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.message && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          {state.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="Masukkan username"
          autoComplete="username"
        />
        {state.errors?.username && (
          <p className="text-red-500 text-sm">{state.errors.username[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Masukkan password"
          autoComplete="current-password"
        />
        {state.errors?.password && (
          <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Memproses...
          </>
        ) : (
          "Login"
        )}
      </Button>

      <p className="text-center text-muted-foreground text-xs">
        Metode Simple Multi Attribute Rating Technique
      </p>
    </form>
  );
}
