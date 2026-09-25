export const dynamic = "force-dynamic";

import Link from "next/link";
import { pool } from "@/lib/db";
import { convertirAEmbed } from "@/lib/embed";

async function getReportajeDestacado() {
  const [rows]: any = await pool.query(`
    SELECT r.id, r.titulo, r.slug, r.resumen_corto, r.foto_principal,
           r.fecha_publicacion, a.nombres AS autor_nombre, a.nickname AS autor_nickname
    FROM reportajes r
    LEFT JOIN autores a ON r.autor_id = a.id
    WHERE r.estado = 'publicado'
    ORDER BY r.es_destacado DESC, r.fecha_publicacion DESC
    LIMIT 1
  `);
  return rows[0] || null;
}

async function getUltimasNoticias() {
  const [rows]: any = await pool.query(`
    SELECT id, titulo, foto, link_externo, fecha_publicacion
    FROM noticias
    WHERE estado = 'publicado'
    ORDER BY fecha_publicacion DESC, id DESC
    LIMIT 3
  `);
  return rows;
}

async function getUltimosBoletines() {
  const [rows]: any = await pool.query(`
    SELECT id, numero_boletin, titulo, slug, foto_portada, fecha_publicacion
    FROM boletines
    WHERE estado = 'publicado'
    ORDER BY fecha_publicacion DESC, id DESC
    LIMIT 3
  `);
  return rows;
}

async function getPodcastDestacado() {
  const [rows]: any = await pool.query(`
    SELECT id, titulo, descripcion, url_embed, fecha_publicacion
    FROM podcasts
    WHERE estado = 'publicado'
    ORDER BY fecha_publicacion DESC, id DESC
    LIMIT 1
  `);
  return rows[0] || null;
}

export default async function HomePage() {
  const [destacado, noticias, boletines, podcast] = await Promise.all([
    getReportajeDestacado(),
    getUltimasNoticias(),
    getUltimosBoletines(),
    getPodcastDestacado(),
  ]);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-red-900 px-6 py-20 text-white md:py-28">
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-200">
            Periodismo independiente
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Diálogo y Desarrollo
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-red-100 md:text-xl">
            Información, análisis y publicaciones para una sociedad informada.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/reportajes"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-red-800 shadow-lg transition hover:bg-red-50"
            >
              Explorar reportajes
            </Link>
            <Link
              href="/boletines"
              className="rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Ver boletines
            </Link>
          </div>
        </div>
      </section>

      {/* REPORTaje DESTACADO */}
      {destacado && (
        <section className="border-b bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700">
                ⭐ Destacado
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <Link href={`/reportajes/${destacado.slug}`}>
                {destacado.foto_principal ? (
                  <img
                    src={destacado.foto_principal}
                    alt={destacado.titulo}
                    className="h-72 w-full rounded-xl object-cover shadow-xl md:h-96"
                  />
                ) : (
                  <div className="flex h-72 w-full items-center justify-center rounded-xl bg-gray-200 text-gray-400 md:h-96">
                    Sin imagen
                  </div>
                )}
              </Link>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  {new Date(destacado.fecha_publicacion).toLocaleDateString("es-PE", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <Link href={`/reportajes/${destacado.slug}`}>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 hover:text-red-700 md:text-4xl">
                    {destacado.titulo}
                  </h2>
                </Link>

                {destacado.resumen_corto && (
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    {destacado.resumen_corto}
                  </p>
                )}

                <p className="mt-4 text-sm text-gray-500">
                  Por{" "}
                  <span className="font-medium">
                    {destacado.autor_nickname || destacado.autor_nombre || "Redacción"}
                  </span>
                </p>

                <Link
                  href={`/reportajes/${destacado.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-700 px-6 py-3 font-medium text-white transition hover:bg-red-800"
                >
                  Leer reportaje completo →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* NOTICIAS */}
      {noticias.length > 0 && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-3xl font-bold text-gray-900">Últimas noticias</h2>
              <Link href="/actualidad" className="text-sm font-medium text-red-700 hover:underline">
                Ver todas →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {noticias.map((n: any) => (
                <a
                  key={n.id}
                  href={n.link_externo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {n.foto ? (
                    <img
                      src={n.foto}
                      alt={n.titulo}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gray-100" />
                  )}

                  <div className="p-5">
                    <p className="text-xs text-gray-500">
                      {new Date(n.fecha_publicacion).toLocaleDateString("es-PE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold leading-snug text-gray-900 group-hover:text-red-700">
                      {n.titulo}
                    </h3>

                    <span className="mt-4 inline-block text-sm font-medium text-red-700">
                      Leer más →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOLETINES */}
      {boletines.length > 0 && (
        <section className="border-y bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-3xl font-bold text-gray-900">Boletines NTEP</h2>
              <Link href="/boletines" className="text-sm font-medium text-red-700 hover:underline">
                Ver todos →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {boletines.map((b: any) => (
                <Link
                  key={b.id}
                  href={`/boletines/${b.slug}`}
                  className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {b.foto_portada ? (
                    <img
                      src={b.foto_portada}
                      alt={b.titulo}
                      className="h-64 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-64 w-full items-center justify-center bg-gray-100 text-gray-400">
                      Sin portada
                    </div>
                  )}

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
                      Boletín N.º {b.numero_boletin}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-red-700">
                      {b.titulo}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(b.fecha_publicacion).toLocaleDateString("es-PE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PODCAST */}
      {podcast && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-3xl font-bold text-gray-900">Podcast destacado</h2>
              <Link href="/podcast" className="text-sm font-medium text-red-700 hover:underline">
                Ver todos →
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              {(() => {
                const embed = convertirAEmbed(podcast.url_embed);
                return embed ? (
                  <iframe
                    src={embed}
                    className="h-96 w-full rounded-xl shadow-lg"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title={podcast.titulo}
                  />
                ) : (
                  <div className="flex h-96 w-full items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                    Reproductor no disponible
                  </div>
                );
              })()}

              <div>
                <p className="text-sm font-medium text-gray-500">
                  {new Date(podcast.fecha_publicacion).toLocaleDateString("es-PE", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
                  {podcast.titulo}
                </h3>

                {podcast.descripcion && (
                  <p className="mt-4 whitespace-pre-line text-gray-600">
                    {podcast.descripcion}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA CONTACTO */}
      <section className="bg-gray-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            ¿Tienes una noticia o quieres contactarnos?
          </h2>
          <p className="mt-4 text-gray-300">
            Escríbenos y forma parte del diálogo por un desarrollo con información.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="rounded-lg bg-red-700 px-8 py-3 font-semibold text-white transition hover:bg-red-800"
            >
              Contactar
            </Link>
            <Link
              href="/nosotros"
              className="rounded-lg border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Sobre nosotros
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Rediseño del inicio aplicado el 25/09/2026
