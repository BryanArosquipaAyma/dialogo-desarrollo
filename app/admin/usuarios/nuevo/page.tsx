"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoUsuarioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nombres: "",
    ap_paterno: "",
    ap_materno: "",
    email: "",
    password: "",
    rol: "redactor",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.nombres.trim()) return setError("Los nombres son obligatorios");
    if (!form.ap_paterno.trim()) return setError("El apellido paterno es obligatorio");
    if (!form.email.includes("@")) return setError("Email inválido");
    if (form.password.length < 6)
      return setError("La contraseña debe tener al menos 6 caracteres");

    setLoading(true);

    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) router.push("/admin/usuarios");
      else setError(data.error || "Error al guardar");
    } catch (err: any) {
      setLoading(false);
      setError("Error: " + err.message);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Nuevo usuario</h1>
      <p className="mt-1 text-sm text-gray-500">
        Crea un nuevo acceso al panel administrativo.
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
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido paterno *
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
            Email *
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            placeholder="usuario@dialogo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contraseña *
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rol *
          </label>
          <select
            value={form.rol}
            onChange={(e) => setForm({ ...form, rol: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value="redactor">Redactor</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrador</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            <strong>Redactor:</strong> crea contenido.{" "}
            <strong>Editor:</strong> edita cualquier contenido.{" "}
            <strong>Admin:</strong> control total + gestión de usuarios.
          </p>
        </div>

        {error && (
          <div className="rounded bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/usuarios")}
            className="rounded border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar usuario"}
          </button>
        </div>
      </form>
    </div>
  );
}