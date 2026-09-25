import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verificarTokenEdge } from "@/lib/auth-edge";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const publicas = ["/admin/login", "/admin/recuperar"];
  if (publicas.some((p) => path === p || path.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  if (path.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;
    const payload = token ? await verificarTokenEdge(token) : null;

    if (!payload) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
