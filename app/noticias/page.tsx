export default function NoticiasPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-gray-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Noticias</h1>

        <p className="mt-4 text-gray-600">
          Conoce las últimas noticias y novedades.
        </p>

        <div className="mt-10 rounded-lg border p-6">
          <h2 className="text-2xl font-semibold">
            Próximamente
          </h2>

          <p className="mt-2 text-gray-600">
            Aquí aparecerán las noticias publicadas.
          </p>
        </div>
      </div>
    </main>
  );
}