"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Autor = { id: number; nombres: string; nickname: string | null };

export default function NuevoReportajePage() {
  const router = useRouter();
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    resumen_corto: "",
    desarrollo: "",
    foto_principal: "",
    pdf_adjunto: "",
    fecha_publicacion: new Date().toISOString().slice(0, 10),
    es_destacado: false,
    estado: "borrador",
    autor_id: "",
  });

  useEffect(() => {
    fetch("/api/autores")
      .then((r) => r.json())
      .then((d) => setAutores(d.autores || []))
      .catch(() => {});
  }, []);

  async function subirArchivo(file: File, carpeta: string): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("carpeta", carpeta);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al subir archivo");
    return data.url;
  }

  async function handleImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await subirArchivo(file, "reportajes");
      setForm((f) => ({ ...f, foto_principal: url }));
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handlePdf(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await subirArchivo(file, "reportajes");
      setForm((f) => ({ ...f, pdf_adjunto: url }));
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.titulo.trim()) return setError("El título es obligatorio");
    if (!form.desarrollo.trim()) return setError("El desarrollo es obligatorio");
    if (!form.fecha_publicacion) return setError("La fecha es obligatoria");

    setLoading(true);

    try {
      const res = await fetch("/api/reportajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          autor_id: form.autor_id ? Number(form.autor_id) : null,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        router.push("/admin/reportajes");
      } else {
        setError(data.error || "Error al guardar");
      }
    } catch (err: any) {
      setLoading(false);
      setError("Error: " + err.message);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900">Nuevo reportaje</h1>
      <p className="mt-1 text-sm text-gray-500">
        Completa los datos del reportaje. Puedes guardarlo como borrador primero.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Título *
          </label>
          <input
            type="text"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            placeholder="Título del reportaje"
          />
        </div>

        {/* Resumen corto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resumen corto
          </label>
          <textarea
            value={form.resumen_corto}
            onChange={(e) => setForm({ ...form, resumen_corto: e.target.value })}
            rows={3}
            maxLength={500}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            placeholder="Máximo 500 caracteres. Se muestra en la grilla."
          />
          <p className="mt-1 text-xs text-gray-500">
            {form.resumen_corto.length}/500
          </p>
        </div>

        {/* Desarrollo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Desarrollo *
          </label>
          <textarea
            value={form.desarrollo}
            onChange={(e) => setForm({ ...form, desarrollo: e.target.value })}
            rows={15}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm outline-none focus:border-red-600"
            placeholder="Contenido completo del reportaje..."
          />
        </div>

        {/* Foto principal */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Foto principal
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagen}
              className="mt-1 block w-full text-sm"
            />
            {form.foto_principal && (
              <img
                src={form.foto_principal}
                alt="Portada"
                className="mt-3 h-32 w-full rounded object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              PDF adjunto (opcional)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdf}
              className="mt-1 block w-full text-sm"
            />
            {form.pdf_adjunto && (
              <a
                href={form.pdf_adjunto}
                target="_blank"
                className="mt-3 block text-sm text-blue-600 underline"
              >
                📄 Ver PDF adjunto
              </a>
            )}
          </div>
        </div>

        {/* Autor, fecha, estado */}
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Autor
            </label>
            <select
              value={form.autor_id}
              onChange={(e) => setForm({ ...form, autor_id: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">Redacción (por defecto)</option>
              {autores.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nickname || a.nombres}
                </option>
              ))}
            </select>
          </div>

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

        {/* Destacado */}
        <div className="flex items-center gap-3 rounded border border-gray-300 bg-white p-4">
          <input
            type="checkbox"
            id="destacado"
            checked={form.es_destacado}
            onChange={(e) =>
              setForm({ ...form, es_destacado: e.target.checked })
            }
            className="h-4 w-4"
          />
          <label htmlFor="destacado" className="text-sm text-gray-700">
            <strong>Marcar como destacado</strong> — aparecerá en el index del sitio
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
            onClick={() => router.push("/admin/reportajes")}
            className="rounded border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar reportaje"}
          </button>
        </div>
      </form>
    </div>
  );
}