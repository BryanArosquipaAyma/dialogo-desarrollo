import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import slugify from "slugify";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const [rows]: any = await pool.query(
      `SELECT r.*, a.nombres AS autor_nombres
       FROM reportajes r
       LEFT JOIN autores a ON r.autor_id = a.id
       WHERE r.id = ?`,
      [id]
    );
    if (!rows.length) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    const [fotos]: any = await pool.query(
      "SELECT * FROM reportajes_fotos WHERE reportaje_id = ? ORDER BY orden ASC",
      [id]
    );

    return NextResponse.json({ ok: true, reportaje: rows[0], fotos });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const b = await req.json();

    const slugBase = slugify(b.titulo, { lower: true, strict: true });

    await pool.query(
      `UPDATE reportajes SET
        titulo = ?, slug = ?, resumen_corto = ?, desarrollo = ?,
        foto_principal = ?, pdf_adjunto = ?, fecha_publicacion = ?,
        es_destacado = ?, estado = ?, autor_id = ?
       WHERE id = ?`,
      [
        b.titulo,
        `${slugBase}-${id}`,
        b.resumen_corto || null,
        b.desarrollo,
        b.foto_principal || null,
        b.pdf_adjunto || null,
        b.fecha_publicacion,
        b.es_destacado ? 1 : 0,
        b.estado || "borrador",
        b.autor_id || null,
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
    await pool.query("DELETE FROM reportajes WHERE id = ?", [id]);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
