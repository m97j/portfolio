// frontend/app/admin/login/page.tsx
"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password: pw }),
      });
      if (!res.ok) {
        setError("로그인 실패");
        return;
      }
      const { token } = await res.json();
      localStorage.setItem("adminToken", token);
      window.location.href = "/admin/dashboard";
    } catch (e) {
      setError("서버 오류");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input
        className="border p-2 mb-2"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        className="border p-2 mb-2"
        type="password"
        placeholder="Password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        로그인
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
