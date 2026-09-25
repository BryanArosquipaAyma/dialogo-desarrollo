import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const [rows]: any = await pool.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return NextResponse.json({
        ok: true,
        mensaje: "Si el email existe, recibirás un enlace de recuperación.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expira = new Date(Date.now() + 1000 * 60 * 60);

    await pool.query(
      "UPDATE usuarios SET reset_token = ?, reset_token_expira = ? WHERE id = ?",
      [token, expira, rows[0].id]
    );

    return NextResponse.json({
      ok: true,
      mensaje: "Enlace generado (en producción se envía por email).",
      resetUrl: `/admin/recuperar/${token}`,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
