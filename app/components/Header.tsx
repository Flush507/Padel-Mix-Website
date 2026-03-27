"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `cursor-pointer hover:opacity-80 ${
      pathname === path ? "text-black" : ""
    }`;

  return (
    <header className="w-full p-4 flex justify-center items-center bg-[var(--primary)] text-white">
      <nav className="flex gap-10">
        <Link href="/" className={linkClass("/")}>
          Classificação
        </Link>

        <Link href="/mix" className={linkClass("/mix")}>
          Mix
        </Link>

        <Link href="/jogadores" className={linkClass("/jogadores")}>
          Jogadores
        </Link>
      </nav>
    </header>
  );
}