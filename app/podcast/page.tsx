export const dynamic = "force-dynamic";

import { pool } from "@/lib/db";
import { convertirAEmbed } from "@/lib/embed";

async function getPodcasts() {
  const [rows]: any = await pool.query(`
    SELECT id, titulo, descripcion, url_embed, fecha_publicacion
    FROM podcasts
    WHERE estado = 'publicado'
    ORDER BY fecha_publicacion DESC, id DESC
  `);
  return rows;
}

export default async function PodcastPage() {
  const podcasts = await getPodcasts();

  return (
    <div>
      <section className="border-b bg-gray-100 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold text-gray-900">Podcast</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Escucha nuestros episodios.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {podcasts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-16 text-center">
            <p className="text-gray-500">Aún no hay podcasts publicados.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {podcasts.map((p: any) => {
              const embed = convertirAEmbed(p.url_embed);

              return (
                <article
                  key={p.id}
                  className="overflow-hidden rounded-lg border bg-white shadow-sm"
                >
                  <div className="aspect-video w-full bg-gray-100">
                    {embed ? (
                      <iframe
                        src={embed}
                        className="h-full w-full"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        allowFullScreen
                        title={p.titulo}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        Reproductor no disponible
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-gray-500">
                      {new Date(p.fecha_publicacion).toLocaleDateString(
                        "es-PE",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-gray-900">
                      {p.titulo}
                    </h2>

                    {p.descripcion && (
                      <p className="mt-3 text-sm text-gray-600">
                        {p.descripcion}
                      </p>
                    )}

                    <a
                      href={p.url_embed}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm font-medium text-red-700 hover:underline"
                    >
                      Abrir en la plataforma original →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}