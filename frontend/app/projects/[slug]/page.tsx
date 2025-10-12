import { fetchPost } from "@/lib/api";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TagList from "@/components/TagList";

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  return (
    <main className="max-w-4xl mx-auto pt-24 p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.tagString && <TagList tagString={post.tagString} compact={false} />}
      <p className="text-sm text-gray-500">{post.tags?.join(", ")} • {post.language?.toUpperCase()}</p>
      <MarkdownRenderer source={post.contentMd} />
      {post.githubUrl && (
        <a className="mt-6 inline-block text-blue-600" href={post.githubUrl} target="_blank" rel="noopener noreferrer">
          View code on GitHub
        </a>
      )}
    </main>
  );
}
