import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const TIPOS_PERMITIDOS = [
  "image/jpeg", "image/png", "image/webp", "image/gif",
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

    const dir = path.join(process.cwd(), "public", "uploads", carpeta);
    await mkdir(dir, { recursive: true });

    const timestamp = Date.now();
    const nombreLimpio = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-");
    const nombreFinal = `${timestamp}-${nombreLimpio}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(path.join(dir, nombreFinal), buffer);

    const url = `/uploads/${carpeta}/${nombreFinal}`;
    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
