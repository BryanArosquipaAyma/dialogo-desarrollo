import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const estado = searchParams.get("estado");

    let sql = "SELECT * FROM noticias";
    const params: any[] = [];

    if (estado === "publicado" || estado === "borrador") {
      sql += " WHERE estado = ?";
      params.push(estado);
    }

    sql += " ORDER BY fecha_publicacion DESC, id DESC";

    const [rows] = await pool.query(sql, params);
    return NextResponse.json({ ok: true, noticias: rows });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();

    if (!b.titulo?.trim()) {
      return NextResponse.json(
        { error: "El título es obligatorio" },
        { status: 400 }
      );
    }

    if (!b.link_externo?.trim()) {
      return NextResponse.json(
        { error: "El link externo es obligatorio" },
        { status: 400 }
      );
    }

    const [result]: any = await pool.query(
      `INSERT INTO noticias
       (titulo, foto, link_externo, fecha_publicacion, estado, usuario_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        b.titulo,
        b.foto || null,
        b.link_externo,
        b.fecha_publicacion,
        b.estado || "borrador",
        b.usuario_id || 1,
      ]
    );

    return NextResponse.json({ ok: true, id: result.insertId });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}