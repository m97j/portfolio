// frontend/components/Tag.tsx
"use client";
import { useEffect, useState } from "react";
import { TAG_GUIDE_FALLBACK, TagInfo } from "@/lib/tagGuide";
import { TagsAPI } from "@/lib/api";

let TAG_CACHE: Record<string, TagInfo> | null = null;

export default function Tag({ symbol, compact = false }: { symbol: string; compact?: boolean }) {
  const [guide, setGuide] = useState<Record<string, TagInfo>>(TAG_CACHE || {});
  const [hover, setHover] = useState(false);
  const info = guide[symbol] || TAG_GUIDE_FALLBACK[symbol];

  useEffect(() => {
    if (TAG_CACHE) return;
    TagsAPI.list()
      .then(({ items }) => {
        const m: Record<string, TagInfo> = {};
        items.forEach(t => { m[t.emoji] = { emoji: t.emoji, label: t.label, description: t.description }; });
        TAG_CACHE = m;
        setGuide(m);
      })
      .catch(() => setGuide(TAG_GUIDE_FALLBACK));
  }, []);

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
