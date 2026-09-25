import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM noticias WHERE id = ?",
      [params.id]
    );
    if (!rows.length) {
      return NextResponse.json({ error: "No encontrada" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, noticia: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const b = await req.json();

    await pool.query(
      `UPDATE noticias SET
        titulo = ?, foto = ?, link_externo = ?,
        fecha_publicacion = ?, estado = ?
       WHERE id = ?`,
      [
        b.titulo,
        b.foto || null,
        b.link_externo,
        b.fecha_publicacion,
        b.estado || "borrador",
        params.id,
      ]
    );

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await pool.query("DELETE FROM noticias WHERE id = ?", [params.id]);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}