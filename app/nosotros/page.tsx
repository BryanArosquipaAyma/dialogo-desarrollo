export const metadata = {
  title: "Quiénes Somos",
  description:
    "Conoce a Diálogo y Desarrollo, un medio de comunicación comprometido con el periodismo independiente y el análisis profundo de la realidad peruana.",
};

export default function NosotrosPage() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b bg-gray-100 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold text-gray-900">Quiénes Somos</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Periodismo independiente comprometido con la información.
          </p>
        </div>
      </section>

      {/* MISIÓN */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Nuestra misión</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              En <strong>Diálogo y Desarrollo</strong> creemos que una sociedad
              informada es una sociedad capaz de tomar mejores decisiones. Por
              eso trabajamos cada día para ofrecer información rigurosa,
              análisis profundo y publicaciones de calidad que contribuyan al
              debate público y al desarrollo del país.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Nuestro compromiso es con la verdad, la independencia editorial y
              el respeto por la pluralidad de voces.
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-red-700 to-red-900 p-10 text-white shadow-xl">
            <h3 className="text-2xl font-bold">Nuestros valores</h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-2xl">📰</span>
                <div>
                  <strong>Rigor periodístico</strong>
                  <p className="mt-1 text-sm text-red-100">
                    Verificamos cada dato antes de publicarlo.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⚖️</span>
                <div>
                  <strong>Independencia editorial</strong>
                  <p className="mt-1 text-sm text-red-100">
                    Nuestro único compromiso es con la verdad.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <strong>Compromiso social</strong>
                  <p className="mt-1 text-sm text-red-100">
                    Informamos para contribuir al desarrollo.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <strong>Análisis profundo</strong>
                  <p className="mt-1 text-sm text-red-100">
                    Vamos más allá de la noticia superficial.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* QUÉ HACEMOS */}
      <section className="border-y bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Lo que hacemos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
            Cuatro pilares de contenido para mantenerte informado.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-3xl">📰</div>
              <h3 className="text-lg font-semibold text-gray-900">
                Reportajes
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Investigaciones y análisis en profundidad sobre temas de
                actualidad.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-3xl">📢</div>
              <h3 className="text-lg font-semibold text-gray-900">
                Noticias
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Información oportuna sobre los acontecimientos que marcan la
                agenda nacional.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-3xl">📘</div>
              <h3 className="text-lg font-semibold text-gray-900">
                Boletines NTEP
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Publicaciones periódicas con análisis coyuntural y datos
                relevantes.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-3xl">🎙️</div>
              <h3 className="text-lg font-semibold text-gray-900">
                Podcast y Videos
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Contenido audiovisual para acercar la información a más
                audiencias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-gray-900 p-10 text-white md:p-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              ¿Quieres contactarnos?
            </h2>
            <p className="mt-4 text-gray-300">
              Escríbenos a <strong>contacto@dialogoydesarrollo.com.pe</strong>{" "}
              o completa nuestro formulario de contacto.
            </p>
            <a
              href="/contacto"
              className="mt-8 inline-block rounded-lg bg-red-700 px-8 py-3 font-semibold text-white transition hover:bg-red-800"
            >
              Ir a contacto
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}