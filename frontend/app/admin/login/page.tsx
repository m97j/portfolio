"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 간단히 localStorage 저장 후 대시보드로 이동
    localStorage.setItem("ADMIN_ID", id);
    localStorage.setItem("ADMIN_TOKEN", token);
    router.push("/admin/dashboard");
  };

  return (
    <main className="max-w-md mx-auto pt-24 p-4">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
        <input placeholder="admin id" value={id} onChange={(e) => setId(e.target.value)} />
        <input placeholder="token" value={token} onChange={(e) => setToken(e.target.value)} />
        <button className="btn">Login</button>
      </form>
    </main>
  );
}
