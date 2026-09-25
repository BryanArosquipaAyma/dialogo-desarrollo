import { readFileSync, writeFileSync } from "fs";

const archivos = [
  "app/api/autores/[id]/route.ts",
  "app/api/boletines/[id]/route.ts",
  "app/api/noticias/[id]/route.ts",
  "app/api/podcasts/[id]/route.ts",
  "app/api/reportajes/[id]/route.ts",
  "app/api/usuarios/[id]/route.ts",
  "app/api/videos/[id]/route.ts",
];

for (const archivo of archivos) {
  let contenido = readFileSync(archivo, "utf8");

  // 1. Insertar "const { id } = await params;" después de cada función con params
  contenido = contenido.replace(
    /(\{ params \}: \{ params: Promise<\{ id: string \}> \}) \{/g,
    "$1\n  const { id } = await params;"
  );

  // 2. Reemplazar params.id por id
  contenido = contenido.replace(/params\.id/g, "id");

  writeFileSync(archivo, contenido, "utf8");
  console.log(`✅ ${archivo} corregido`);
}
