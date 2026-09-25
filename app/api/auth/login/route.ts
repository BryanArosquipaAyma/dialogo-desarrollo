import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import { firmarToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    const [rows]: any = await pool.query(
      "SELECT id, nombres, ap_paterno, email, password_hash, rol FROM usuarios WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const u = rows[0];
    const ok = await bcrypt.compare(password, u.password_hash);
    if (!ok) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const user = {
      id: u.id,
      email: u.email,
      rol: u.rol,
      nombre: `${u.nombres} ${u.ap_paterno}`,
    };

    const token = await firmarToken(user);
    const res = NextResponse.json({ ok: true, user });
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
