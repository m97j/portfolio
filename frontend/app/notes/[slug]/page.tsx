// frontend/app/notes/[slug]/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { PostsAPI } from "@/lib/api";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TagList from "@/components/TagList";
import { useEffect, useState } from "react";

export default function NoteDetail({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // 토큰 로드
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("adminToken"));
    }

    // 글 데이터 로드
    PostsAPI.bySlug("notes", params.slug)
      .then(setPost)
      .catch((e) => console.error("Failed to fetch note:", e))
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) return <p className="p-6">로딩 중...</p>;
  if (!post) {
    return (
      <div className="p-6">
        <p className="text-gray-500">존재하지 않는 노트입니다.</p>
      </div>
    );
  }

  const tagString = post.tags?.map((t: any) => t.tag.emoji).join(" ") || "";

  async function handleDelete() {
    try {
      await PostsAPI.delete("notes", post.id);
      alert("삭제 완료");
      router.replace("/notes");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "삭제 실패");
      if (err.message.includes("Unauthorized")) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      }
    }
  }

  function handleEdit() {
    router.push(`/admin/edit/notes/${post.id}`);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500">{post.subtitle}</p>
      <TagList tagString={tagString} />
      <MarkdownRenderer content={post.contentMd} />

      {error && <p className="text-red-500">{error}</p>}

      {/* Admin 로그인 시에만 버튼 노출 */}
      {token && (
        <div className="mt-6 flex gap-2">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={handleEdit}>
            편집
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDelete}>
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
