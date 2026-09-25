import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const [rows]: any = await pool.query(
      "SELECT id, nombres, ap_paterno, ap_materno, email, rol FROM usuarios WHERE id = ?",
      [params.id]
    );
    if (!rows.length) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, usuario: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const b = await req.json();

    // Verificar que el email no esté usado por otro usuario
    const [existe]: any = await pool.query(
      "SELECT id FROM usuarios WHERE email = ? AND id != ?",
      [b.email, params.id]
    );

    if (existe.length) {
      return NextResponse.json(
        { error: "Este email ya está registrado por otro usuario" },
        { status: 400 }
      );
    }

    // Si viene password, actualizarla
    if (b.password && b.password.length >= 6) {
      const hash = await bcrypt.hash(b.password, 10);
      await pool.query(
        `UPDATE usuarios SET
          nombres = ?, ap_paterno = ?, ap_materno = ?,
          email = ?, rol = ?, password_hash = ?
         WHERE id = ?`,
        [
          b.nombres,
          b.ap_paterno,
          b.ap_materno || null,
          b.email,
          b.rol,
          hash,
          params.id,
        ]
      );
    } else {
      // Sin cambiar password
      await pool.query(
        `UPDATE usuarios SET
          nombres = ?, ap_paterno = ?, ap_materno = ?,
          email = ?, rol = ?
         WHERE id = ?`,
        [
          b.nombres,
          b.ap_paterno,
          b.ap_materno || null,
          b.email,
          b.rol,
          params.id,
        ]
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    // Verificar que no sea el último admin
    const [user]: any = await pool.query(
      "SELECT rol FROM usuarios WHERE id = ?",
      [params.id]
    );

    if (!user.length) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    if (user[0].rol === "admin") {
      const [admins]: any = await pool.query(
        "SELECT COUNT(*) AS total FROM usuarios WHERE rol = 'admin'"
      );
      if (admins[0].total <= 1) {
        return NextResponse.json(
          { error: "No puedes eliminar al último administrador" },
          { status: 400 }
        );
      }
    }

    await pool.query("DELETE FROM usuarios WHERE id = ?", [params.id]);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}