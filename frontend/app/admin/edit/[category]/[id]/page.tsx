// frontend/app/admin/edit/[category]/[id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { PostsAPI } from "@/lib/api";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function AdminEditPage({ params }: { params: { category: string; id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [contentMd, setContentMd] = useState("");
  const [emojis, setEmojis] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const post = await PostsAPI.bySlug(params.category as any, params.id);
        setTitle(post.title);
        setSlug(post.slug);
        setSubtitle(post.subtitle || "");
        setContentMd(post.contentMd || "");
        setCoverUrl(post.coverUrl || "");
        setEmojis(post.tags?.map((t: any) => t.tag.emoji).join(" ") || "");
      } catch (err: any) {
        alert("데이터 로드 실패");
        router.push("/admin/dashboard");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params, router]);

  async function handleUpdate() {
    try {
      const emojiList = emojis.split(/[,\s]+/).filter(Boolean);
      const body = { slug, title, subtitle, contentMd, coverUrl, emojis: emojiList };

      const updated = await PostsAPI.update(params.category as any, params.id, body);
      alert("수정 완료");
      router.push(`/${params.category}/${updated.slug}`);
    } catch (err: any) {
      alert(err.message || "수정 실패");
      if (err.message.includes("Unauthorized")) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      }
    }
  }

  if (loading) return <p className="p-6">로딩 중...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Edit Post</h1>
      <input className="border p-2 rounded w-full" value={slug} onChange={(e) => setSlug(e.target.value)} />
      <input className="border p-2 rounded w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="border p-2 rounded w-full" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      <input className="border p-2 rounded w-full" value={emojis} onChange={(e) => setEmojis(e.target.value)} />
      <input className="border p-2 rounded w-full" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />

      <div data-color-mode="light" className="border rounded">
        <MDEditor value={contentMd} onChange={(v) => setContentMd(v || "")} height={400} />
      </div>

      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleUpdate}>
        Update post
      </button>
    </div>
  );
}
