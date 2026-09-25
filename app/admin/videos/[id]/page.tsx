"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditarVideoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    url_embed: "",
    fecha_publicacion: "",
    estado: "borrador",
  });

  useEffect(() => {
    fetch(`/api/videos/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.video) {
          const v = data.video;
          setForm({
            titulo: v.titulo || "",
            descripcion: v.descripcion || "",
            url_embed: v.url_embed || "",
            fecha_publicacion: v.fecha_publicacion
              ? v.fecha_publicacion.slice(0, 10)
              : "",
            estado: v.estado || "borrador",
          });
        } else {
          setError("Video no encontrado");
        }
        setLoading(false);
      })
      .catch((e) => {
        setError("Error: " + e.message);
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setSaving(false);

      if (res.ok) {
        setSuccess("✅ Video actualizado");
        setTimeout(() => router.push("/admin/videos"), 1000);
      } else {
        setError(data.error || "Error al guardar");
      }
    } catch (err: any) {
      setSaving(false);
      setError("Error: " + err.message);
    }
  }

  if (loading) return <p className="text-gray-500">Cargando video...</p>;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900">Editar video</h1>

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
        {success && (
          <div className="rounded bg-green-50 p-4 text-sm text-green-700">
            {success}
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
            disabled={saving}
            className="rounded bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}