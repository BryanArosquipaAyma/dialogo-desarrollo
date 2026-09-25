"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditarNoticiaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    foto: "",
    link_externo: "",
    fecha_publicacion: "",
    estado: "borrador",
  });

  useEffect(() => {
    fetch(`/api/noticias/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.noticia) {
          const n = data.noticia;
          setForm({
            titulo: n.titulo || "",
            foto: n.foto || "",
            link_externo: n.link_externo || "",
            fecha_publicacion: n.fecha_publicacion
              ? n.fecha_publicacion.slice(0, 10)
              : "",
            estado: n.estado || "borrador",
          });
        } else {
          setError("Noticia no encontrada");
        }
        setLoading(false);
      })
      .catch((e) => {
        setError("Error: " + e.message);
        setLoading(false);
      });
  }, [id]);

  async function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("carpeta", "noticias");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) setForm((f) => ({ ...f, foto: data.url }));
      else setError(data.error);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const res = await fetch(`/api/noticias/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setSaving(false);

      if (res.ok) {
        setSuccess("✅ Noticia actualizada");
        setTimeout(() => router.push("/admin/noticias"), 1000);
      } else {
        setError(data.error || "Error al guardar");
      }
    } catch (err: any) {
      setSaving(false);
      setError("Error: " + err.message);
    }
  }

  if (loading) return <p className="text-gray-500">Cargando noticia...</p>;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900">Editar noticia</h1>

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
            Link externo *
          </label>
          <input
            type="url"
            value={form.link_externo}
            onChange={(e) =>
              setForm({ ...form, link_externo: e.target.value })
            }
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Foto
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFoto}
            className="mt-1 block w-full text-sm"
          />
          {form.foto && (
            <img
              src={form.foto}
              alt="Foto"
              className="mt-3 h-48 w-full rounded object-cover"
            />
          )}
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
            onClick={() => router.push("/admin/noticias")}
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