import { pool } from "@/lib/db";

async function getStats() {
  const [[reportajes]]: any = await pool.query(
    "SELECT COUNT(*) AS total FROM reportajes"
  );
  const [[noticias]]: any = await pool.query(
    "SELECT COUNT(*) AS total FROM noticias"
  );
  const [[boletines]]: any = await pool.query(
    "SELECT COUNT(*) AS total FROM boletines"
  );
  const [[podcasts]]: any = await pool.query(
    "SELECT COUNT(*) AS total FROM podcasts"
  );
  const [[videos]]: any = await pool.query(
    "SELECT COUNT(*) AS total FROM videos"
  );
  return {
    reportajes: reportajes.total,
    noticias: noticias.total,
    boletines: boletines.total,
    podcasts: podcasts.total,
    videos: videos.total,
  };
}

export default async function AdminHome() {
  const stats = await getStats();

  const cards = [
    { label: "Reportajes", value: stats.reportajes, href: "/admin/reportajes", color: "bg-red-600" },
    { label: "Noticias", value: stats.noticias, href: "/admin/noticias", color: "bg-blue-600" },
    { label: "Boletines NTEP", value: stats.boletines, href: "/admin/boletines", color: "bg-emerald-600" },
    { label: "Podcasts", value: stats.podcasts, href: "/admin/podcasts", color: "bg-purple-600" },
    { label: "Videos", value: stats.videos, href: "/admin/videos", color: "bg-orange-600" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">
        Resumen general del contenido publicado.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:shadow-lg"
          >
            <div className={`mb-4 h-1 w-12 rounded ${c.color}`} />
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{c.value}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
