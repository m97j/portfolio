"use client";

import Image from "next/image";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex w-full items-center justify-center relative">
        {/* 왼쪽 로고 */}
        <div className="absolute left-4">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <Image
              src="/favicon.png"
              alt="Minjae Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* 가운데 메뉴 */}
        <ul className="menu menu-horizontal text-sm font-medium gap-x-6">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/notes">Study Notes</Link>
          </li>
          <li>
            <Link href="/info">Information</Link>
          </li>
        </ul>

        {/* 오른쪽 다크모드 토글 */}
        <div className="absolute right-4">
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
