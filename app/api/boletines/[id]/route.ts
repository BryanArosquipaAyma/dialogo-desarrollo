import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM boletines WHERE id = ?",
      [id]
    );
    if (!rows.length) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, boletin: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const b = await req.json();

    await pool.query(
      `UPDATE boletines SET
        numero_boletin = ?, titulo = ?, resumen = ?,
        foto_portada = ?, archivo_pdf = ?, fecha_publicacion = ?,
        estado = ?
       WHERE id = ?`,
      [
        b.numero_boletin,
        b.titulo,
        b.resumen || null,
        b.foto_portada || null,
        b.archivo_pdf,
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
    await pool.query("DELETE FROM boletines WHERE id = ?", [id]);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}