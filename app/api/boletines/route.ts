import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import slugify from "slugify";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const estado = searchParams.get("estado");

    let sql = "SELECT * FROM boletines";
    const params: any[] = [];

    if (estado === "publicado" || estado === "borrador") {
      sql += " WHERE estado = ?";
      params.push(estado);
    }

    sql += " ORDER BY fecha_publicacion DESC, id DESC";

    const [rows] = await pool.query(sql, params);
    return NextResponse.json({ ok: true, boletines: rows });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();

    if (!b.archivo_pdf) {
      return NextResponse.json(
        { error: "El archivo PDF es obligatorio" },
        { status: 400 }
      );
    }

    const slugBase = slugify(`${b.numero_boletin}-${b.titulo}`, {
      lower: true,
      strict: true,
    });
    const slug = `${slugBase}-${Date.now().toString(36)}`;

    const [result]: any = await pool.query(
      `INSERT INTO boletines
       (numero_boletin, titulo, slug, resumen, foto_portada, archivo_pdf,
        fecha_publicacion, estado, usuario_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        b.numero_boletin,
        b.titulo,
        slug,
        b.resumen || null,
        b.foto_portada || null,
        b.archivo_pdf,
        b.fecha_publicacion,
        b.estado || "borrador",
        b.usuario_id || 1,
      ]
    );

    return NextResponse.json({ ok: true, id: result.insertId, slug });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}