import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM autores WHERE id = ?",
      [id]
    );
    if (!rows.length) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, autor: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const b = await req.json();

    await pool.query(
      `UPDATE autores SET
        nombres = ?, ap_paterno = ?, ap_materno = ?,
        nickname = ?, es_nickname = ?
       WHERE id = ?`,
      [
        b.nombres,
        b.ap_paterno || null,
        b.ap_materno || null,
        b.nickname || null,
        b.es_nickname ? 1 : 0,
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
    await pool.query("DELETE FROM autores WHERE id = ?", [id]);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}