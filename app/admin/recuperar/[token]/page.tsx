"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CambiarPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCambiar() {
    setError("");
    setOk(false);

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/cambiar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setOk(true);
        setTimeout(() => router.push("/admin/login"), 2000);
      } else {
        setError(data.error || "Error al cambiar la contraseña");
      }
    } catch (err: any) {
      setLoading(false);
      setError("Error: " + err.message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-xl font-bold text-gray-900">Nueva contraseña</h1>
        <p className="mt-1 text-sm text-gray-500">
          Ingresa tu nueva contraseña.
        </p>

        {ok ? (
          <div className="mt-6 rounded bg-green-50 p-4 text-sm text-green-700">
            ✅ Contraseña actualizada. Redirigiendo al login...
          </div>
        ) : (
          <>
            <label className="mt-6 block text-sm font-medium text-gray-700">
              Nueva contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            />

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Repetir contraseña
            </label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
            />

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <button
              type="button"
              onClick={handleCambiar}
              disabled={loading}
              className="mt-6 w-full rounded bg-red-700 py-2 font-medium text-white transition hover:bg-red-800 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Cambiar contraseña"}
            </button>
          </>
        )}

        <a
          href="/admin/login"
          className="mt-4 block text-center text-xs text-gray-500 hover:text-red-700"
        >
          Volver al login
        </a>
      </div>
    </main>
  );
}
