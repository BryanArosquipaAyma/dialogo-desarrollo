import Link from "next/link";
import { pool } from "@/lib/db";

async function getBoletines() {
  const [rows]: any = await pool.query(`
    SELECT id, numero_boletin, titulo, slug, resumen,
           foto_portada, archivo_pdf, fecha_publicacion
    FROM boletines
    WHERE estado = 'publicado'
    ORDER BY fecha_publicacion DESC, id DESC
  `);
  return rows;
}

export default async function BoletinesPage() {
  const boletines = await getBoletines();

  return (
    <div>
      <section className="border-b bg-gray-100 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold text-gray-900">Boletines NTEP</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Consulta nuestros boletines NTEP (No Todo Está Perdido).
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {boletines.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-16 text-center">
            <p className="text-gray-500">Aún no hay boletines publicados.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {boletines.map((b: any) => (
              <article
                key={b.id}
                className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-lg"
              >
                {b.foto_portada ? (
                  <img
                    src={b.foto_portada}
                    alt={b.titulo}
                    className="h-72 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-72 w-full items-center justify-center bg-gray-200 text-gray-400">
                    Sin portada
                  </div>
                )}

                <div className="p-6">
                  <p className="text-sm font-medium text-red-700">
                    Boletín N.º {b.numero_boletin}
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-gray-900">
                    {b.titulo}
                  </h2>

                  {b.resumen && (
                    <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                      {b.resumen}
                    </p>
                  )}

                  <p className="mt-4 text-xs text-gray-500">
                    {new Date(b.fecha_publicacion).toLocaleDateString("es-PE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/boletines/${b.slug}`}
                      className="flex-1 rounded bg-red-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-800"
                    >
                      Ver boletín
                    </Link>
                    <a
                      href={b.archivo_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      title="Descargar PDF"
                    >
                      ↓ PDF
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}