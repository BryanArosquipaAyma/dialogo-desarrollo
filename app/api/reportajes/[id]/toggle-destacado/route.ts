import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    await pool.query(
      `UPDATE reportajes
       SET es_destacado = IF(es_destacado = 1, 0, 1)
       WHERE id = ?`,
      [params.id]
    );
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}