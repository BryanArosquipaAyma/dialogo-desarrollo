"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditarUsuarioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    nombres: "",
    ap_paterno: "",
    ap_materno: "",
    email: "",
    password: "",
    rol: "redactor",
  });

  useEffect(() => {
    fetch(`/api/usuarios/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.usuario) {
          const u = data.usuario;
          setForm({
            nombres: u.nombres || "",
            ap_paterno: u.ap_paterno || "",
            ap_materno: u.ap_materno || "",
            email: u.email || "",
            password: "",
            rol: u.rol || "redactor",
          });
        } else {
          setError("Usuario no encontrado");
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
      const res = await fetch(`/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setSaving(false);

      if (res.ok) {
        setSuccess("✅ Usuario actualizado");
        setTimeout(() => router.push("/admin/usuarios"), 1000);
      } else {
        setError(data.error || "Error al guardar");
      }
    } catch (err: any) {
      setSaving(false);
      setError("Error: " + err.message);
    }
  }

  if (loading) return <p className="text-gray-500">Cargando usuario...</p>;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Editar usuario</h1>

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
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nueva contraseña (opcional)
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            placeholder="Dejar vacío para no cambiar"
          />
          <p className="mt-1 text-xs text-gray-500">
            Si dejas el campo vacío, la contraseña actual se mantiene.
          </p>
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
            onClick={() => router.push("/admin/usuarios")}
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