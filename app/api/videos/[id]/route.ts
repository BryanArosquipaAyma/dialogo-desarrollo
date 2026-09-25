import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM videos WHERE id = ?",
      [id]
    );
    if (!rows.length) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, video: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const b = await req.json();

    await pool.query(
      `UPDATE videos SET
        titulo = ?, descripcion = ?, url_embed = ?,
        fecha_publicacion = ?, estado = ?
       WHERE id = ?`,
      [
        b.titulo,
        b.descripcion || null,
        b.url_embed,
        b.fecha_publicacion,
        b.estado || "borrador",
        id,
      ]
    );

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await pool.query("DELETE FROM videos WHERE id = ?", [id]);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}