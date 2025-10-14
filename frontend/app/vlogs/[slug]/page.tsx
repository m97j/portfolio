import { PostsAPI } from "@/lib/api";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TagList from "@/components/TagList";

export default async function VlogDetail({ params }: { params: { slug: string } }) {
  let post: any = null;

  try {
    post = await PostsAPI.bySlug("vlogs", params.slug);
  } catch (e) {
    console.error("Failed to fetch vlog:", e);
  }

  if (!post) {
    return (
      <div className="p-6">
        <p className="text-gray-500">존재하지 않는 Vlog입니다.</p>
      </div>
    );
  }

  const tagString = post.tags?.map((t: any) => t.tag.emoji).join(" ") || "";

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500">{post.subtitle}</p>
      <TagList tagString={tagString} />
      <MarkdownRenderer content={post.contentMd} />
    </div>
  );
}
