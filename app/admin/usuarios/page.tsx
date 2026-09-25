export const dynamic = "force-dynamic";

import Link from "next/link";
import { pool } from "@/lib/db";
import AccionesUsuario from "./_components/AccionesUsuario";

async function getUsuarios() {
  const [rows]: any = await pool.query(`
    SELECT id, nombres, ap_paterno, email, rol, created_at
    FROM usuarios
    ORDER BY id ASC
  `);
  return rows;
}

const colorRol: Record<string, string> = {
  admin: "bg-red-100 text-red-700",
  editor: "bg-blue-100 text-blue-700",
  redactor: "bg-gray-100 text-gray-700",
};

export default async function AdminUsuariosPage() {
  const usuarios = await getUsuarios();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuarios</h1>
          <p className="mt-1 text-sm text-gray-500">
            {usuarios.length} usuario{usuarios.length !== 1 && "s"} en total
          </p>
        </div>
        <Link
          href="/admin/usuarios/nuevo"
          className="rounded bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-red-800"
        >
          + Nuevo usuario
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u: any) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {u.nombres} {u.ap_paterno}
                </td>
                <td className="px-4 py-3 text-gray-600">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      colorRol[u.rol] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {u.rol}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <AccionesUsuario id={u.id} rol={u.rol} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}