"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const esAdmin = pathname?.startsWith("/admin");

  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-white text-gray-900">
        {!esAdmin && <Header />}
        <main className="flex-1">{children}</main>
        {!esAdmin && <Footer />}
      </body>
    </html>
  );
}