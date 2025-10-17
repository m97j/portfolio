export const dynamic = "force-dynamic";

import { PostsAPI } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard";

// frontend/app/projects/page.tsx
export default async function ProjectsPage() {
  const params = new URLSearchParams();
  let items: any[] = [];

  try {
    const res = await PostsAPI.list("projects", params);
    items = res.items ?? [];
  } catch (e) {
    console.error("Failed to fetch projects:", e);
  }

  return (
    <main className="max-w-5xl mx-auto pt-24 p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">아직 프로젝트가 없습니다.</p>
      ) : (
        items.map((p: any) => <ProjectCard key={p.slug} project={p} />)
      )}
    </main>
  );
}

