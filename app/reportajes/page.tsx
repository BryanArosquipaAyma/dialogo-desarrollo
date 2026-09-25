export const dynamic = "force-dynamic";

import Link from "next/link";
import { pool } from "@/lib/db";

async function getReportajes() {
  const [rows] = await pool.query(`
    SELECT r.id, r.titulo, r.slug, r.resumen_corto, r.foto_principal,
           r.fecha_publicacion, r.es_destacado,
           a.nombres AS autor_nombre, a.nickname AS autor_nickname
    FROM reportajes r
    LEFT JOIN autores a ON r.autor_id = a.id
    WHERE r.estado = 'publicado'
    ORDER BY r.fecha_publicacion DESC, r.id DESC
  `);
  return rows as any[];
}

export default async function ReportajesPage() {
  const reportajes = await getReportajes();

  return (
    <div>
      <section className="border-b bg-gray-100 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold text-gray-900">Reportajes</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Investigaciones y análisis en profundidad.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {reportajes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-16 text-center">
            <p className="text-gray-500">
              Aún no hay reportajes publicados.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {reportajes.map((r) => (
              <article
                key={r.id}
                className="grid gap-8 border-b border-gray-200 pb-12 lg:grid-cols-2"
              >
                <Link href={`/reportajes/${r.slug}`}>
                  {r.foto_principal ? (
                    <img
                      src={r.foto_principal}
                      alt={r.titulo}
                      className="h-80 w-full rounded-lg object-cover transition hover:opacity-90"
                    />
                  ) : (
                    <div className="flex h-80 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-400">
                      Sin imagen
                    </div>
                  )}
                </Link>

                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium text-gray-500">
                    {new Date(r.fecha_publicacion).toLocaleDateString("es-PE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <Link href={`/reportajes/${r.slug}`}>
                    <h2 className="mt-2 text-3xl font-bold text-red-700 hover:underline">
                      {r.titulo}
                    </h2>
                  </Link>

                  {r.resumen_corto && (
                    <p className="mt-4 text-gray-700">{r.resumen_corto}</p>
                  )}

                  <div className="mt-4 text-sm text-gray-500">
                    Por{" "}
                    <span className="font-medium">
                      {r.autor_nickname || r.autor_nombre || "Redacción"}
                    </span>
                  </div>

                  <Link
                    href={`/reportajes/${r.slug}`}
                    className="mt-6 inline-block text-sm font-medium text-red-700 hover:underline"
                  >
                    Leer reportaje completo →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}