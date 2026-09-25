"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoVideoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    url_embed: "",
    fecha_publicacion: new Date().toISOString().slice(0, 10),
    estado: "borrador",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.titulo.trim()) return setError("El título es obligatorio");
    if (!form.url_embed.trim())
      return setError("La URL del video es obligatoria");

    setLoading(true);

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) router.push("/admin/videos");
      else setError(data.error || "Error al guardar");
    } catch (err: any) {
      setLoading(false);
      setError("Error: " + err.message);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900">Nuevo video</h1>
      <p className="mt-1 text-sm text-gray-500">
        Pega la URL del video de YouTube.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Título *
          </label>
          <input
            type="text"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            placeholder="Título del video"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            URL del video *
          </label>
          <input
            type="url"
            value={form.url_embed}
            onChange={(e) => setForm({ ...form, url_embed: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            value={form.descripcion}
            onChange={(e) =>
              setForm({ ...form, descripcion: e.target.value })
            }
            rows={3}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de publicación *
            </label>
            <input
              type="date"
              value={form.fecha_publicacion}
              onChange={(e) =>
                setForm({ ...form, fecha_publicacion: e.target.value })
              }
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="borrador">Borrador</option>
              <option value="publicado">Publicado</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/videos")}
            className="rounded border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar video"}
          </button>
        </div>
      </form>
    </div>
  );
}