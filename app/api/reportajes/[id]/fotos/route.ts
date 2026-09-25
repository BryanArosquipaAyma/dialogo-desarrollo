import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { url_foto, descripcion, orden } = await req.json();
    await pool.query(
      "INSERT INTO reportajes_fotos (reportaje_id, url_foto, descripcion, orden) VALUES (?, ?, ?, ?)",
      [params.id, url_foto, descripcion || null, orden || 0]
    );
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const fotoId = searchParams.get("fotoId");
    if (!fotoId) {
      return NextResponse.json({ error: "Falta fotoId" }, { status: 400 });
    }
    await pool.query(
      "DELETE FROM reportajes_fotos WHERE id = ? AND reportaje_id = ?",
      [fotoId, params.id]
    );
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
