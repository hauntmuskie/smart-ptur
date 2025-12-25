"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { loginSchema } from "@/db/validation";
import { verifyPassword } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/session";

export type LoginState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const validatedFields = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!user) {
    return {
      message: "Username atau password salah",
    };
  }

  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    return {
      message: "Username atau password salah",
    };
  }

  await createSession(user);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
