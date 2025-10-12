import { fetchPosts } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage() {
  const list = await fetchPosts({ category: "projects" });
  return (
    <main className="max-w-5xl mx-auto pt-24 p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p: any) => <ProjectCard key={p.slug} project={p} />)}
    </main>
  );
}
