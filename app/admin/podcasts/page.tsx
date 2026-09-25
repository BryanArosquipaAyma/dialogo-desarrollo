export const dynamic = "force-dynamic";

import Link from "next/link";
import { pool } from "@/lib/db";
import AccionesPodcast from "./_components/AccionesPodcast";

async function getPodcasts() {
  const [rows]: any = await pool.query(`
    SELECT id, titulo, url_embed, fecha_publicacion, estado
    FROM podcasts
    ORDER BY fecha_publicacion DESC, id DESC
  `);
  return rows;
}

export default async function AdminPodcastsPage() {
  const podcasts = await getPodcasts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Podcasts</h1>
          <p className="mt-1 text-sm text-gray-500">
            {podcasts.length} podcast{podcasts.length !== 1 && "s"} en total
          </p>
        </div>
        <Link
          href="/admin/podcasts/nuevo"
          className="rounded bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-red-800"
        >
          + Nuevo podcast
        </Link>
      </div>

      {podcasts.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-500">No hay podcasts todavía. ¡Crea el primero!</p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {podcasts.map((p: any) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.titulo}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(p.fecha_publicacion).toLocaleDateString("es-PE")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        p.estado === "publicado"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <AccionesPodcast id={p.id} estado={p.estado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
