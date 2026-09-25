import { readFileSync, writeFileSync } from "fs";
import { globSync } from "fs";

// Buscar TODOS los archivos route.ts que tengan [id] en la ruta
const archivos = globSync("app/api/**/[id]/**/route.ts").concat(
  globSync("app/api/**/[id]/route.ts")
);

console.log(`Encontrados ${archivos.length} archivos para procesar`);

for (const archivo of archivos) {
  let contenido = readFileSync(archivo, "utf8");
  const original = contenido;
  let cambios = 0;

  // 1. Cambiar tipo de params (por si algún archivo no lo tiene)
  contenido = contenido.replace(
    /params: \{ id: string \}/g,
    "params: Promise<{ id: string }>"
  );

  // 2. Insertar "const { id } = await params;" línea por línea
  const lineas = contenido.split("\n");
  const resultado = [];
  for (const linea of lineas) {
    resultado.push(linea);
    if (
      linea.includes("params: Promise<{ id: string }> }) {") &&
      !linea.trim().startsWith("//")
    ) {
      resultado.push("  const { id } = await params;");
      cambios++;
    }
  }
  contenido = resultado.join("\n");

  // 3. Reemplazar params.id por id
  contenido = contenido.replace(/params\.id/g, "id");

  // Solo escribir si hubo cambios
  if (contenido !== original) {
    writeFileSync(archivo, contenido, "utf8");
    console.log(`✅ ${archivo} — ${cambios} funciones corregidas`);
  } else {
    console.log(`⏭️  ${archivo} — sin cambios`);
  }
}
