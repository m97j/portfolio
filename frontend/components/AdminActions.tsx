// frontend/components/AdminActions.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostsAPI } from "@/lib/api";

export default function AdminActions({ category, post }: { category: string; post: any }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("adminToken"));
  }, []);

  if (!token) return null; // 로그인 안 된 경우 버튼 숨김

  async function handleDelete() {
    try {
      await PostsAPI.delete(category as any, post.slug);
      alert("삭제 완료");
      router.replace(`/${category}`);
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
    router.push(`/admin/edit/${category}/${post.slug}`);
  }

  return (
    <div className="mt-6 space-y-2">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={handleEdit}>
          편집
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}
