import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-bold text-blue-700">
          Diálogo y Desarrollo
        </Link>
        <ul className="flex flex-wrap gap-5 text-sm text-gray-700">
          <li><Link href="/noticias" className="hover:text-blue-600">Noticias</Link></li>
          <li><Link href="/boletines" className="hover:text-blue-600">Boletines</Link></li>
          <li><Link href="/reportajes" className="hover:text-blue-600">Reportajes</Link></li>
          <li><Link href="/podcast" className="hover:text-blue-600">Podcast</Link></li>
          <li><Link href="/especiales" className="hover:text-blue-600">Especiales</Link></li>
          <li><Link href="/nosotros" className="hover:text-blue-600">Nosotros</Link></li>
          <li><Link href="/contacto" className="hover:text-blue-600">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
}