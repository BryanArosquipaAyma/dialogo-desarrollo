"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@dialogo.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", res.status, data);

      if (res.ok) {
        // Navegación con recarga completa para asegurar cookie
        window.location.replace("/admin");
      } else {
        setError(data.error || "Credenciales incorrectas");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Error: " + err.message);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-xs font-bold text-white">
            DDP
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Panel D&D</h1>
            <p className="text-xs text-gray-500">Acceso restringido</p>
          </div>
        </div>

        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
        />

        <label className="mt-4 block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full rounded bg-red-700 py-2 font-medium text-white transition hover:bg-red-800 disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <a
          href="/admin/recuperar"
          className="mt-4 block text-center text-xs text-gray-500 hover:text-red-700"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </main>
  );
}
