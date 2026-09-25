import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-700 text-xs font-bold text-white">
            DDP
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-800 lg:flex">
          <Link href="/" className="text-red-700">Inicio</Link>
          <Link href="/actualidad" className="hover:text-red-700">Actualidad</Link>
          <Link href="/reportajes" className="hover:text-red-700">Reportajes</Link>
          <Link href="/podcast" className="hover:text-red-700">Podcast</Link>
          <Link href="/boletines" className="hover:text-red-700">Boletín NTEP</Link>
          <Link href="/alianzas" className="hover:text-red-700">Alianzas</Link>
          <Link href="/nosotros" className="hover:text-red-700">Sobre D&D</Link>
        </nav>

        <Link
          href="/contacto"
          className="hidden rounded border border-gray-800 px-6 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white lg:block"
        >
          Contacto
        </Link>
      </div>
    </header>
  );
}