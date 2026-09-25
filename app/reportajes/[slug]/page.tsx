export const dynamic = "force-dynamic";

import Link from "next/link";
import { pool } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

async function getReportaje(slug: string) {
  const [rows]: any = await pool.query(
    `SELECT r.*, a.nombres AS autor_nombre, a.nickname AS autor_nickname
     FROM reportajes r
     LEFT JOIN autores a ON r.autor_id = a.id
     WHERE r.slug = ? AND r.estado = 'publicado'`,
    [slug]
  );
  if (!rows.length) return null;

  const [fotos]: any = await pool.query(
    "SELECT * FROM reportajes_fotos WHERE reportaje_id = ? ORDER BY orden ASC, id ASC",
    [rows[0].id]
  );

  return { reportaje: rows[0], fotos };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const [rows]: any = await pool.query(
    "SELECT titulo, resumen_corto, foto_principal FROM reportajes WHERE slug = ?",
    [slug]
  );

  if (!rows.length) {
    return { title: "Reportaje no encontrado" };
  }

  const r = rows[0];

  return {
    title: r.titulo,
    description: r.resumen_corto || r.titulo,
    openGraph: {
      title: r.titulo,
      description: r.resumen_corto || r.titulo,
      images: r.foto_principal ? [r.foto_principal] : [],
      type: "article",
    },
  };
}

export default async function ReportajeDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getReportaje(slug);
  if (!data) notFound();

  const { reportaje: r, fotos } = data;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/reportajes"
        className="text-sm text-red-700 hover:underline"
      >
        ← Volver a reportajes
      </Link>

      <p className="mt-6 text-sm font-medium text-gray-500">
        {new Date(r.fecha_publicacion).toLocaleDateString("es-PE", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>

      <h1 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
        {r.titulo}
      </h1>

      <p className="mt-4 text-sm text-gray-500">
        Por{" "}
        <span className="font-medium">
          {r.autor_nickname || r.autor_nombre || "Redacción"}
        </span>
      </p>

      {r.foto_principal && (
        <img
          src={r.foto_principal}
          alt={r.titulo}
          className="mt-8 w-full rounded-lg"
        />
      )}

      {r.resumen_corto && (
        <p className="mt-8 text-xl font-medium leading-relaxed text-gray-700">
          {r.resumen_corto}
        </p>
      )}

      <div className="mt-8 whitespace-pre-wrap text-lg leading-relaxed text-gray-800">
        {r.desarrollo}
      </div>

      {fotos.length > 0 && (
        <section className="mt-12 border-t pt-10">
          <h2 className="text-2xl font-bold text-gray-900">Galería</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {fotos.map((f: any) => (
              <figure key={f.id}>
                <img
                  src={f.url_foto}
                  alt={f.descripcion || ""}
                  className="w-full rounded-lg"
                />
                {f.descripcion && (
                  <figcaption className="mt-2 text-sm text-gray-500">
                    {f.descripcion}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {r.pdf_adjunto && (
        <section className="mt-12 border-t pt-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Documento adjunto
          </h2>
          <a
            href={r.pdf_adjunto}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-red-700 px-6 py-3 font-medium text-white hover:bg-red-800"
          >
            📄 Descargar PDF
          </a>
        </section>
      )}

      <div className="mt-12 border-t pt-8">
        <Link
          href="/reportajes"
          className="text-sm text-red-700 hover:underline"
        >
          ← Volver a todos los reportajes
        </Link>
      </div>
    </article>
  );
}