"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y - lastY > 10) setVisible(false); // scrolling down
      else if (lastY - y > 10) setVisible(true);         // slight scroll up
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 transition-transform duration-200 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } bg-white dark:bg-black/80 backdrop-blur`}
    >
      <nav className="max-w-5xl mx-auto flex items-center justify-between p-3">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/vlogs">Dev Vlog</Link>
          <Link href="/notes">Notes</Link>
        </div>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <Link href="/admin/login">Admin</Link>
        </div>
      </nav>
    </div>
  );
}
