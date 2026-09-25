"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccionesVideo({
  id,
  estado,
}: {
  id: number;
  estado: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleEstado() {
    if (!confirm("¿Cambiar el estado de este video?")) return;
    setLoading(true);
    await fetch(`/api/videos/${id}/toggle-estado`, { method: "POST" });
    router.refresh();
    setLoading(false);
  }

  async function eliminar() {
    if (!confirm("⚠️ ¿Eliminar este video?")) return;
    setLoading(true);
    await fetch(`/api/videos/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-end gap-3 text-sm">
      <button
        onClick={toggleEstado}
        disabled={loading}
        className={`rounded px-2 py-1 text-xs font-medium ${
          estado === "publicado"
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
        }`}
      >
        {estado === "publicado" ? "Despublicar" : "Publicar"}
      </button>

      <Link
        href={`/admin/videos/${id}`}
        className="text-blue-600 hover:underline"
      >
        Editar
      </Link>

      <button
        onClick={eliminar}
        disabled={loading}
        className="text-red-600 hover:underline"
      >
        Eliminar
      </button>
    </div>
  );
}