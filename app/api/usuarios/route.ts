import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombres, ap_paterno, ap_materno, email, rol, created_at FROM usuarios ORDER BY id ASC"
    );
    return NextResponse.json({ ok: true, usuarios: rows });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();

    if (!b.nombres?.trim() || !b.ap_paterno?.trim()) {
      return NextResponse.json(
        { error: "Nombres y apellido paterno son obligatorios" },
        { status: 400 }
      );
    }

    if (!b.email?.trim() || !b.email.includes("@")) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    if (!b.password || b.password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    const [existe]: any = await pool.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [b.email]
    );

    if (existe.length) {
      return NextResponse.json(
        { error: "Este email ya está registrado" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(b.password, 10);

    const [result]: any = await pool.query(
      `INSERT INTO usuarios
       (nombres, ap_paterno, ap_materno, email, password_hash, rol)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        b.nombres,
        b.ap_paterno,
        b.ap_materno || null,
        b.email,
        hash,
        b.rol || "redactor",
      ]
    );

    return NextResponse.json({ ok: true, id: result.insertId });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}