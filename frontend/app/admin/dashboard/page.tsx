// frontend/app/admin/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function AdminDashboard() {
  const router = useRouter();
  const [category, setCategory] = useState<"notes" | "vlogs" | "projects">("notes");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [contentMd, setContentMd] = useState<string>("# Hello\n\nInline math: $E=mc^2$");
  const [emojis, setEmojis] = useState<string>("🟠 ⚫");
  const [coverUrl, setCoverUrl] = useState("");

  // 로그인 체크
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/admin/login");
  }, [router]);

  async function handleCreate() {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("로그인이 필요합니다");
      router.push("/admin/login");
      return;
    }

    const emojiList = emojis.split(/[,\s]+/).filter(Boolean);
    const body = {
      slug,
      title,
      subtitle,
      category,
      contentMd,
      coverUrl,
      visibility: "public",
      emojis: emojiList,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${category}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      alert(await res.text());
      return;
    }
    const json = await res.json();
    alert(`Created: ${json.slug}`);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="border p-2 rounded"
          >
            <option value="notes">Notes</option>
            <option value="vlogs">Vlogs</option>
            <option value="projects">Projects</option>
          </select>
        </label>
        <label>
          Slug
          <input
            className="border p-2 rounded w-full"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </label>
        <label>
          Title
          <input
            className="border p-2 rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Subtitle
          <input
            className="border p-2 rounded w-full"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </label>
        <label>
          Emojis
          <input
            className="border p-2 rounded w-full"
            value={emojis}
            onChange={(e) => setEmojis(e.target.value)}
          />
        </label>
        <label>
          Cover URL
          <input
            className="border p-2 rounded w-full"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />
        </label>
      </div>

      <div data-color-mode="light" className="border rounded">
        <MDEditor value={contentMd} onChange={(v) => setContentMd(v || "")} height={400} />
      </div>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleCreate}
      >
        Create post
      </button>
    </div>
  );
}
