import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password || password.length < 6) {
      return NextResponse.json(
        { error: "Datos inválidos (mínimo 6 caracteres)" },
        { status: 400 }
      );
    }

    const [rows]: any = await pool.query(
      "SELECT id FROM usuarios WHERE reset_token = ? AND reset_token_expira > NOW()",
      [token]
    );

    if (!rows.length) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE usuarios SET password_hash = ?, reset_token = NULL, reset_token_expira = NULL WHERE id = ?",
      [hash, rows[0].id]
    );

    return NextResponse.json({ ok: true, mensaje: "Contraseña actualizada" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
