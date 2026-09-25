import Link from "next/link";
import { pool } from "@/lib/db";
import AccionesAutor from "./_components/AccionesAutor";

async function getAutores() {
  const [rows]: any = await pool.query(`
    SELECT id, nombres, ap_paterno, ap_materno, nickname, es_nickname
    FROM autores
    ORDER BY nombres ASC
  `);
  return rows;
}

export default async function AdminAutoresPage() {
  const autores = await getAutores();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Autores</h1>
          <p className="mt-1 text-sm text-gray-500">
            {autores.length} autor{autores.length !== 1 && "es"} en total
          </p>
        </div>
        <Link
          href="/admin/autores/nuevo"
          className="rounded bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-red-800"
        >
          + Nuevo autor
        </Link>
      </div>

      {autores.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-500">
            No hay autores todavía. ¡Crea el primero!
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Nickname</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {autores.map((a: any) => (
                <tr key={a.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {a.nombres} {a.ap_paterno || ""} {a.ap_materno || ""}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {a.nickname || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        a.es_nickname
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {a.es_nickname ? "Nickname" : "Nombre real"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <AccionesAutor id={a.id} />
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