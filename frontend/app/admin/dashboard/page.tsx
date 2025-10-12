"use client";
import { useEffect, useState } from "react";
import { adminCreatePost } from "@/lib/api";

export default function AdminDashboard() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "projects",
    tags: "",
    summary: "",
    contentMd: "",
    visibility: "public",
    language: "ko",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = localStorage.getItem("ADMIN_ID")!;
    const token = localStorage.getItem("ADMIN_TOKEN")!;
    const dto = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    };
    const res = await adminCreatePost(dto, id, token);
    alert("Created: " + res.slug);
  };

  return (
    <main className="max-w-3xl mx-auto pt-24 p-4">
      <h1 className="text-2xl font-bold">Create Post</h1>
      <form onSubmit={submit} className="grid grid-cols-2 gap-3">
        <input placeholder="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}/>
        <input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}/>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="projects">projects</option>
          <option value="vlogs">vlogs</option>
          <option value="notes">notes</option>
        </select>
        <input placeholder="tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}/>
        <input placeholder="summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })}/>
        <select value={form.visibility} onChange={(e) => setForm({ ...form, visibility: e.target.value })}>
          <option value="public">public</option>
          <option value="private">private</option>
        </select>
        <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
          <option value="ko">ko</option>
          <option value="en">en</option>
        </select>
        <textarea className="col-span-2 h-64" placeholder="Markdown content" value={form.contentMd} onChange={(e) => setForm({ ...form, contentMd: e.target.value })}/>
        <button className="col-span-2 btn">Create</button>
      </form>
    </main>
  );
}
