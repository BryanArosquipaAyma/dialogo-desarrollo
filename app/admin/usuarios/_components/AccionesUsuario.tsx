"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccionesUsuario({
  id,
  rol,
}: {
  id: number;
  rol: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function eliminar() {
    if (!confirm("⚠️ ¿Eliminar este usuario? Esta acción no se puede deshacer."))
      return;
    setLoading(true);

    const res = await fetch(`/api/usuarios/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Error al eliminar");
    }

    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-end gap-3 text-sm">
      <Link
        href={`/admin/usuarios/${id}`}
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