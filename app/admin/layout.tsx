import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navClass =
    "rounded px-3 py-2 text-gray-300 no-underline visited:text-gray-300 transition hover:bg-gray-800 hover:text-white";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="flex w-64 flex-col bg-gray-900 px-4 py-6 text-gray-300">
        <Link href="/admin" className="mb-6 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-700 text-xs font-bold text-white">
            DDP
          </div>
          <span className="text-sm font-bold text-white">Panel D&D</span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="mb-4 rounded border border-gray-700 px-3 py-2 text-center text-sm text-gray-400 no-underline visited:text-gray-400 transition hover:bg-gray-800 hover:text-white"
        >
          🌐 Ver sitio público
        </Link>

        <nav className="flex flex-1 flex-col gap-1 text-sm">
          <Link href="/admin" className={navClass}>
            📊 Dashboard
          </Link>
          <Link href="/admin/reportajes" className={navClass}>
            📰 Reportajes
          </Link>
          <Link href="/admin/noticias" className={navClass}>
            📢 Noticias
          </Link>
          <Link href="/admin/boletines" className={navClass}>
            📘 Boletines NTEP
          </Link>
          <Link href="/admin/podcasts" className={navClass}>
            🎙️ Podcasts
          </Link>
          <Link href="/admin/videos" className={navClass}>
            🎬 Videos
          </Link>
          <Link href="/admin/autores" className={navClass}>
            ✍️ Autores
          </Link>
          <Link href="/admin/usuarios" className={navClass}>
            👥 Usuarios
          </Link>
        </nav>
      </aside>

      <main className="flex-1 px-6 py-8 md:px-10">{children}</main>
    </div>
  );
}