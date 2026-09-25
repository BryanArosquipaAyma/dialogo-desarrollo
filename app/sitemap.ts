export const dynamic = "force-dynamic";

import { MetadataRoute } from "next";
import { pool } from "@/lib/db";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/actualidad`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/reportajes`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/boletines`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/podcast`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/videos`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/nosotros`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contacto`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const [reportajes]: any = await pool.query(
    "SELECT slug, updated_at FROM reportajes WHERE estado = 'publicado'"
  );

  const [boletines]: any = await pool.query(
    "SELECT slug, created_at FROM boletines WHERE estado = 'publicado'"
  );

  const reportajeUrls: MetadataRoute.Sitemap = reportajes.map((r: any) => ({
    url: `${BASE_URL}/reportajes/${r.slug}`,
    lastModified: r.updated_at ? new Date(r.updated_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const boletinUrls: MetadataRoute.Sitemap = boletines.map((b: any) => ({
    url: `${BASE_URL}/boletines/${b.slug}`,
    lastModified: b.created_at ? new Date(b.created_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...reportajeUrls, ...boletinUrls];
}