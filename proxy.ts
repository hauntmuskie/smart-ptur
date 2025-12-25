import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const protectedRoutes = new Set([
  "/dashboard",
  "/karyawan",
  "/kriteria",
  "/pembobotan",
  "/perhitungan",
  "/aktivitas",
]);

const protectedPrefixes = Array.from(protectedRoutes);

function isProtectedRoute(path: string): boolean {
  return protectedPrefixes.some((prefix) => path.startsWith(prefix));
}

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = isProtectedRoute(path);
  const isAuthPage = path === "/login";
  const isRoot = path === "/";

  const needsSession = isProtected || isAuthPage || isRoot;
  if (!needsSession) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);
  const isAuthenticated = Boolean(session?.userId);

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if ((isAuthPage || isRoot) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isRoot && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$).*)"],
};
