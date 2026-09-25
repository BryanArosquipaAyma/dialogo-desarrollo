export const dynamic = "force-dynamic";

import Link from "next/link";
import { pool } from "@/lib/db";
import { notFound } from "next/navigation";

async function getBoletin(slug: string) {
  const [rows]: any = await pool.query(
    "SELECT * FROM boletines WHERE slug = ? AND estado = 'publicado'",
    [slug]
  );
  if (!rows.length) return null;
  return rows[0];
}

export default async function BoletinDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = await getBoletin(slug);
  if (!b) notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/boletines"
        className="text-sm text-red-700 hover:underline"
      >
        ← Volver a boletines
      </Link>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          {b.foto_portada ? (
            <img
              src={b.foto_portada}
              alt={b.titulo}
              className="w-full rounded-lg border"
            />
          ) : (
            <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-400">
              Sin portada
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-red-700">
            Boletín N.º {b.numero_boletin}
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            {b.titulo}
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            {new Date(b.fecha_publicacion).toLocaleDateString("es-PE", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          {b.resumen && <p className="mt-6 text-gray-700">{b.resumen}</p>}

          <a
            href={b.archivo_pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded bg-red-700 px-6 py-3 font-medium text-white hover:bg-red-800"
          >
            📄 Descargar PDF
          </a>
        </div>
      </div>

      <section className="mt-12 border-t pt-10">
        <h2 className="text-2xl font-bold text-gray-900">Vista previa</h2>
        <div className="mt-4 overflow-hidden rounded-lg border">
          <iframe
            src={b.archivo_pdf}
            className="h-[800px] w-full"
            title={`Boletín ${b.numero_boletin}`}
          />
        </div>
      </section>

      <div className="mt-12 border-t pt-8">
        <Link
          href="/boletines"
          className="text-sm text-red-700 hover:underline"
        >
          ← Volver a todos los boletines
        </Link>
      </div>
    </article>
  );
}
