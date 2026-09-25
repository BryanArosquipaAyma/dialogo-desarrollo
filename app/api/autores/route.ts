import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombres, ap_paterno, ap_materno, nickname, es_nickname FROM autores ORDER BY nombres ASC"
    );
    return NextResponse.json({ ok: true, autores: rows });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();

    if (!b.nombres?.trim()) {
      return NextResponse.json(
        { error: "Los nombres son obligatorios" },
        { status: 400 }
      );
    }

    const [result]: any = await pool.query(
      `INSERT INTO autores
       (nombres, ap_paterno, ap_materno, nickname, es_nickname)
       VALUES (?, ?, ?, ?, ?)`,
      [
        b.nombres,
        b.ap_paterno || null,
        b.ap_materno || null,
        b.nickname || null,
        b.es_nickname ? 1 : 0,
      ]
    );

    return NextResponse.json({ ok: true, id: result.insertId });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}