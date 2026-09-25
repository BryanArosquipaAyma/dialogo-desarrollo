import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-gray-900 px-6 py-12 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-700 text-xs font-bold text-white">
            DDP
          </div>
          <p className="mt-4 text-sm">
            Diálogo y Desarrollo — Información, análisis y publicaciones para una
            sociedad informada.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase text-white">Secciones</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/actualidad" className="hover:text-white">Actualidad</Link></li>
            <li><Link href="/reportajes" className="hover:text-white">Reportajes</Link></li>
            <li><Link href="/podcast" className="hover:text-white">Podcast</Link></li>
            <li><Link href="/boletines" className="hover:text-white">Boletín NTEP</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase text-white">Contacto</h4>
          <p className="mt-4 text-sm">contacto@dialogoydesarrollo.com.pe</p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-gray-700 pt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Diálogo y Desarrollo — Todos los derechos reservados.
      </div>
    </footer>
  );
}