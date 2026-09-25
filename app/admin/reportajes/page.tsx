import Link from "next/link";
import { pool } from "@/lib/db";
import AccionesReportaje from "./_components/AccionesReportaje";

async function getReportajes() {
  const [rows]: any = await pool.query(`
    SELECT r.id, r.titulo, r.estado, r.es_destacado, r.fecha_publicacion,
           a.nombres AS autor_nombre, a.nickname AS autor_nickname
    FROM reportajes r
    LEFT JOIN autores a ON r.autor_id = a.id
    ORDER BY r.fecha_publicacion DESC, r.id DESC
  `);
  return rows;
}

export default async function AdminReportajesPage() {
  const reportajes = await getReportajes();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportajes</h1>
          <p className="mt-1 text-sm text-gray-500">
            {reportajes.length} reportaje{reportajes.length !== 1 && "s"} en total
          </p>
        </div>
        <Link
          href="/admin/reportajes/nuevo"
          className="rounded bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-red-800"
        >
          + Nuevo reportaje
        </Link>
      </div>

      {reportajes.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-500">No hay reportajes todavía.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Autor</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reportajes.map((r: any) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">{r.titulo}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {r.autor_nickname || r.autor_nombre || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(r.fecha_publicacion).toLocaleDateString("es-PE")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        r.estado === "publicado"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {r.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <AccionesReportaje
                      id={r.id}
                      estado={r.estado}
                      destacado={r.es_destacado}
                    />
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
