import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

const TIPOS_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

const TAMANO_MAXIMO = 10 * 1024 * 1024; // 10 MB

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | null;
    const carpeta = (data.get("carpeta") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "Sin archivo" }, { status: 400 });
    }

    if (!TIPOS_PERMITIDOS.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido" },
        { status: 400 }
      );
    }

    if (file.size > TAMANO_MAXIMO) {
      return NextResponse.json(
        { error: "Archivo demasiado grande (máx 10 MB)" },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const nombreLimpio = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-");
    const nombreFinal = `${carpeta}/${timestamp}-${nombreLimpio}`;

    const blob = await put(nombreFinal, file, {
      access: "public",
    });

    return NextResponse.json({ ok: true, url: blob.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}