import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import slugify from "slugify";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const estado = searchParams.get("estado");

    let sql = `
      SELECT r.*, a.nombres AS autor_nombres, a.nickname AS autor_nickname
      FROM reportajes r
      LEFT JOIN autores a ON r.autor_id = a.id
    `;
    const params: any[] = [];

    if (estado === "publicado" || estado === "borrador") {
      sql += " WHERE r.estado = ?";
      params.push(estado);
    }

    sql += " ORDER BY r.fecha_publicacion DESC, r.id DESC";

    const [rows] = await pool.query(sql, params);
    return NextResponse.json({ ok: true, reportajes: rows });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();

    const slugBase = slugify(b.titulo, { lower: true, strict: true });
    const slug = `${slugBase}-${Date.now().toString(36)}`;

    const [result]: any = await pool.query(
      `INSERT INTO reportajes
       (titulo, slug, resumen_corto, desarrollo, foto_principal, pdf_adjunto,
        fecha_publicacion, es_destacado, estado, autor_id, usuario_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        b.titulo,
        slug,
        b.resumen_corto || null,
        b.desarrollo,
        b.foto_principal || null,
        b.pdf_adjunto || null,
        b.fecha_publicacion,
        b.es_destacado ? 1 : 0,
        b.estado || "borrador",
        b.autor_id || null,
        b.usuario_id || 1,
      ]
    );

    return NextResponse.json({ ok: true, id: result.insertId, slug });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
