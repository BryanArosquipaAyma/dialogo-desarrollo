"use client";
import { useEffect, useState } from "react";

type Foto = {
  id: number;
  url_foto: string;
  descripcion: string | null;
  orden: number;
};

export default function Galeria({ reportajeId }: { reportajeId: string }) {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState("");

  async function cargar() {
    const res = await fetch(`/api/reportajes/${reportajeId}/fotos`);
    if (res.ok) {
      const data = await res.json();
      setFotos(data.fotos || []);
    }
  }

  useEffect(() => {
    cargar();
  }, [reportajeId]);

  async function handleSubir(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setSubiendo(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("carpeta", "reportajes");
      const resUpload = await fetch("/api/upload", { method: "POST", body: fd });
      const dataUpload = await resUpload.json();

      if (!resUpload.ok) throw new Error(dataUpload.error);

      const res = await fetch(`/api/reportajes/${reportajeId}/fotos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url_foto: dataUpload.url,
          orden: fotos.length,
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error);
      }

      await cargar();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubiendo(false);
    }
  }

  async function eliminarFoto(fotoId: number) {
    if (!confirm("¿Eliminar esta foto?")) return;
    await fetch(`/api/reportajes/${reportajeId}/fotos?fotoId=${fotoId}`, {
      method: "DELETE",
    });
    cargar();
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Galería adicional
          </h3>
          <p className="text-xs text-gray-500">
            {fotos.length} foto{fotos.length !== 1 && "s"} en la galería
          </p>
        </div>
        <label className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
          {subiendo ? "Subiendo..." : "+ Agregar foto"}
          <input
            type="file"
            accept="image/*"
            onChange={handleSubir}
            disabled={subiendo}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <p className="mt-3 rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>
      )}

      {fotos.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">
          Aún no hay fotos adicionales. Sube la primera.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {fotos.map((f) => (
            <div key={f.id} className="group relative overflow-hidden rounded">
              <img
                src={f.url_foto}
                alt={f.descripcion || ""}
                className="h-32 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => eliminarFoto(f.id)}
                className="absolute right-1 top-1 hidden rounded bg-red-600 px-2 py-1 text-xs text-white group-hover:block"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}