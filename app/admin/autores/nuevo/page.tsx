"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoAutorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nombres: "",
    ap_paterno: "",
    ap_materno: "",
    nickname: "",
    es_nickname: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.nombres.trim()) return setError("Los nombres son obligatorios");

    setLoading(true);

    try {
      const res = await fetch("/api/autores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) router.push("/admin/autores");
      else setError(data.error || "Error al guardar");
    } catch (err: any) {
      setLoading(false);
      setError("Error: " + err.message);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Nuevo autor</h1>
      <p className="mt-1 text-sm text-gray-500">
        Los autores se asignan a los reportajes.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombres *
          </label>
          <input
            type="text"
            value={form.nombres}
            onChange={(e) => setForm({ ...form, nombres: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            placeholder="Ej. Juan Carlos"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido paterno
            </label>
            <input
              type="text"
              value={form.ap_paterno}
              onChange={(e) =>
                setForm({ ...form, ap_paterno: e.target.value })
              }
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido materno
            </label>
            <input
              type="text"
              value={form.ap_materno}
              onChange={(e) =>
                setForm({ ...form, ap_materno: e.target.value })
              }
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nickname
          </label>
          <input
            type="text"
            value={form.nickname}
            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            placeholder="Ej. Redacción, Anónimo, Corresponsal"
          />
        </div>

        <div className="flex items-center gap-3 rounded border border-gray-300 bg-white p-4">
          <input
            type="checkbox"
            id="es_nickname"
            checked={form.es_nickname}
            onChange={(e) =>
              setForm({ ...form, es_nickname: e.target.checked })
            }
            className="h-4 w-4"
          />
          <label htmlFor="es_nickname" className="text-sm text-gray-700">
            <strong>Publicar con nickname</strong> — en lugar del nombre real
          </label>
        </div>

        {error && (
          <div className="rounded bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/autores")}
            className="rounded border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar autor"}
          </button>
        </div>
      </form>
    </div>
  );
}