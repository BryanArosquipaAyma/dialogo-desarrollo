"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccionesAutor({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function eliminar() {
    if (
      !confirm(
        "⚠️ ¿Eliminar este autor? Los reportajes que lo tengan asignado quedarán sin autor."
      )
    )
      return;
    setLoading(true);
    await fetch(`/api/autores/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-end gap-3 text-sm">
      <Link
        href={`/admin/autores/${id}`}
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