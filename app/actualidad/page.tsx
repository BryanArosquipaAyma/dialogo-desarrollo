export const dynamic = "force-dynamic";

import { pool } from "@/lib/db";

async function getNoticias() {
  const [rows]: any = await pool.query(`
    SELECT id, titulo, foto, link_externo, fecha_publicacion
    FROM noticias
    WHERE estado = 'publicado'
    ORDER BY fecha_publicacion DESC, id DESC
  `);
  return rows;
}

export default async function ActualidadPage() {
  const noticias = await getNoticias();

  return (
    <div>
      <section className="border-b bg-gray-100 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold text-gray-900">Actualidad</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Las últimas noticias y novedades.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {noticias.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-16 text-center">
            <p className="text-gray-500">Aún no hay noticias publicadas.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {noticias.map((n: any) => (
              <a
                key={n.id}
                href={n.link_externo}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-lg"
              >
                {n.foto ? (
                  <img
                    src={n.foto}
                    alt={n.titulo}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-200" />
                )}

                <div className="p-5">
                  <p className="text-xs text-gray-500">
                    {new Date(n.fecha_publicacion).toLocaleDateString("es-PE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <h2 className="mt-2 text-lg font-semibold text-gray-900 transition group-hover:text-red-700">
                    {n.titulo}
                  </h2>

                  <p className="mt-3 inline-block text-sm font-medium text-red-700">
                    Leer más →
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
