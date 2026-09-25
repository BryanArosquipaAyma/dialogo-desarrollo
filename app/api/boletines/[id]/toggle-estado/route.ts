import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await pool.query(
      `UPDATE boletines
       SET estado = IF(estado = 'publicado', 'borrador', 'publicado')
       WHERE id = ?`,
      [id]
    );
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}