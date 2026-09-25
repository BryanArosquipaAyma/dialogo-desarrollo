export const metadata = {
  title: "Alianzas",
  description:
    "Conoce las alianzas estratégicas de Diálogo y Desarrollo con instituciones comprometidas con la información y el desarrollo del país.",
};

export default function AlianzasPage() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b bg-gray-100 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-bold uppercase tracking-wider text-red-700">
            Colaboración
          </span>
          <h1 className="mt-3 text-5xl font-black text-gray-900 md:text-6xl">
            Alianzas
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 md:text-xl">
            Trabajamos con instituciones y organizaciones comprometidas con
            el periodismo independiente y el desarrollo del país.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Construimos puentes, no muros
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            En <strong>Diálogo y Desarrollo</strong> creemos en el poder de la
            colaboración. Trabajamos con universidades, medios de comunicación,
            organizaciones de la sociedad civil y empresas comprometidas con
            la transparencia y el desarrollo del país.
          </p>
        </div>
      </section>

      {/* TIPOS DE ALIANZAS */}
      <section className="border-y bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Tipos de colaboración
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-white p-8 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">🎓</div>
              <h3 className="text-xl font-bold text-gray-900">
                Universidades
              </h3>
              <p className="mt-3 text-gray-600">
                Investigación conjunta, publicaciones académicas y formación de
                nuevos periodistas.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">📻</div>
              <h3 className="text-xl font-bold text-gray-900">
                Medios de comunicación
              </h3>
              <p className="mt-3 text-gray-600">
                Intercambio de contenido, coberturas conjuntas y difusión de
                información verificada.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">🤝</div>
              <h3 className="text-xl font-bold text-gray-900">
                Organizaciones sociales
              </h3>
              <p className="mt-3 text-gray-600">
                Colaboración con instituciones comprometidas con el desarrollo
                y la transparencia.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">🏢</div>
              <h3 className="text-xl font-bold text-gray-900">
                Sector privado
              </h3>
              <p className="mt-3 text-gray-600">
                Alianzas con empresas responsables que apoyan el periodismo
                independiente.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">🌎</div>
              <h3 className="text-xl font-bold text-gray-900">
                Cooperación internacional
              </h3>
              <p className="mt-3 text-gray-600">
                Vínculos con organismos internacionales que promueven la
                libertad de prensa.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">💡</div>
              <h3 className="text-xl font-bold text-gray-900">
                Innovación
              </h3>
              <p className="mt-3 text-gray-600">
                Colaboración con startups y centros tecnológicos para nuevos
                formatos periodísticos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-red-800 via-red-700 to-red-900 p-10 text-white md:p-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black md:text-5xl">
              ¿Quieres ser parte?
            </h2>
            <p className="mt-6 text-lg text-red-100 md:text-xl">
              Si tu organización comparte nuestra visión de un periodismo
              independiente y comprometido con el desarrollo, conversemos.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/contacto"
                className="rounded-xl bg-white px-8 py-4 text-base font-bold text-red-800 shadow-2xl transition hover:scale-105 hover:bg-red-50 md:text-lg"
              >
                Contactar
              </a>
              <a
                href="/nosotros"
                className="rounded-xl border-2 border-white/30 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/10 md:text-lg"
              >
                Conocer más
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}