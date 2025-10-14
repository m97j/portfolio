import { PostsAPI } from "@/lib/api";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TagList from "@/components/TagList";

// frontend/app/projects/[slug]/page.tsx
export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  let post: any = null;

  try {
    post = await PostsAPI.bySlug("projects", params.slug);
  } catch (e) {
    console.error("Failed to fetch project:", e);
  }

  if (!post) {
    return <main className="max-w-4xl mx-auto pt-24 p-4">존재하지 않는 프로젝트입니다.</main>;
  }

  return (
    <main className="max-w-4xl mx-auto pt-24 p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.tagString && <TagList tagString={post.tagString} compact={false} />}
      <p className="text-sm text-gray-500">
        {post.tags?.join(", ")} • {post.language?.toUpperCase()}
      </p>
      <MarkdownRenderer content={post.contentMd} />
      {post.githubUrl && (
        <a
          className="mt-6 inline-block text-blue-600"
          href={post.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View code on GitHub
        </a>
      )}
    </main>
  );
}
