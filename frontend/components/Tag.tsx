"use client";
import { useState } from "react";
import { TAG_GUIDE } from "@/lib/tagGuide";

export default function Tag({ symbol, compact = false }: { symbol: string; compact?: boolean }) {
  const [hover, setHover] = useState(false);
  const info = TAG_GUIDE[symbol];
  if (!info) return <span>{symbol}</span>;
  return (
    <span
      className="relative inline-flex items-center px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 cursor-help"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {info.emoji}
      {!compact && hover && (
        <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 z-10 bg-black text-white text-xs px-2 py-1 rounded shadow">
          {info.label} — {info.description}
        </span>
      )}
    </span>
  );
}
