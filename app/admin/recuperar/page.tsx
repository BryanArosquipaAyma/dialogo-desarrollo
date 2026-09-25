"use client";
import { useState } from "react";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [resetUrl, setResetUrl] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setResetUrl("");

    const res = await fetch("/api/auth/recuperar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const d = await res.json();
    setMsg(d.mensaje);
    if (d.resetUrl) setResetUrl(d.resetUrl);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg"
      >
        <h1 className="text-xl font-bold">Recuperar contraseña</h1>
        <p className="mt-1 text-sm text-gray-500">
          Ingresa tu email y te enviaremos un enlace.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="mt-6 w-full rounded border border-gray-300 px-3 py-2"
          required
        />

        <button
          type="submit"
          className="mt-4 w-full rounded bg-red-700 py-2 text-white hover:bg-red-800"
        >
          Enviar enlace
        </button>

        {msg && <p className="mt-4 text-sm text-gray-700">{msg}</p>}

        {resetUrl && (
          <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-3">
            <p className="text-xs text-blue-700">
              👉 Haz clic aquí para cambiar tu contraseña:
            </p>
            <a
              href={resetUrl}
              className="mt-2 block break-all text-sm font-medium text-blue-700 underline hover:text-blue-900"
            >
              Cambiar contraseña
            </a>
          </div>
        )}

        <a
          href="/admin/login"
          className="mt-4 block text-center text-xs text-gray-500 hover:text-red-700"
        >
          Volver al login
        </a>
      </form>
    </main>
  );
}
