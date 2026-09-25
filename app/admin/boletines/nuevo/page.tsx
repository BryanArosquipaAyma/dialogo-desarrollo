"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoBoletinPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    numero_boletin: "",
    titulo: "",
    resumen: "",
    foto_portada: "",
    archivo_pdf: "",
    fecha_publicacion: new Date().toISOString().slice(0, 10),
    estado: "borrador",
  });

  async function subirArchivo(file: File, carpeta: string): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("carpeta", carpeta);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al subir archivo");
    return data.url;
  }

  async function handlePortada(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await subirArchivo(file, "boletines");
      setForm((f) => ({ ...f, foto_portada: url }));
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handlePdf(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await subirArchivo(file, "boletines");
      setForm((f) => ({ ...f, archivo_pdf: url }));
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.numero_boletin.trim()) return setError("El número es obligatorio");
    if (!form.titulo.trim()) return setError("El título es obligatorio");
    if (!form.archivo_pdf) return setError("El archivo PDF es obligatorio");
    if (!form.fecha_publicacion) return setError("La fecha es obligatoria");

    setLoading(true);

    try {
      const res = await fetch("/api/boletines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        router.push("/admin/boletines");
      } else {
        setError(data.error || "Error al guardar");
      }
    } catch (err: any) {
      setLoading(false);
      setError("Error: " + err.message);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900">Nuevo boletín</h1>
      <p className="mt-1 text-sm text-gray-500">
        Sube el PDF del boletín y su portada. El PDF es obligatorio.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de boletín *
            </label>
            <input
              type="text"
              value={form.numero_boletin}
              onChange={(e) =>
                setForm({ ...form, numero_boletin: e.target.value })
              }
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
              placeholder="Ej. 46"
            />
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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Título *
          </label>
          <input
            type="text"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            placeholder="Ej. Boletín NTEP Año 2026"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resumen
          </label>
          <textarea
            value={form.resumen}
            onChange={(e) => setForm({ ...form, resumen: e.target.value })}
            rows={3}
            maxLength={500}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            placeholder="Breve presentación del boletín"
          />
          <p className="mt-1 text-xs text-gray-500">
            {form.resumen.length}/500
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Foto de portada
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePortada}
              className="mt-1 block w-full text-sm"
            />
            {form.foto_portada && (
              <img
                src={form.foto_portada}
                alt="Portada"
                className="mt-3 h-40 w-full rounded object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Archivo PDF *
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdf}
              className="mt-1 block w-full text-sm"
            />
            {form.archivo_pdf && (
              <a
                href={form.archivo_pdf}
                target="_blank"
                className="mt-3 block text-sm text-blue-600 underline"
              >
                📄 Ver PDF subido
              </a>
            )}
          </div>
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

        {error && (
          <div className="rounded bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/boletines")}
            className="rounded border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar boletín"}
          </button>
        </div>
      </form>
    </div>
  );
}