export const dynamic = "force-dynamic";

import { PostsAPI } from "@/lib/api";

export default async function VlogsPage() {
  const params = new URLSearchParams();
  let data: { items: any[] } = { items: [] };

  try {
    data = await PostsAPI.list("blogs", params);
  } catch (e) {
    console.error("Failed to fetch vlogs:", e);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Dev / Study Blogs</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data.items.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            아직 등록된 Blog가 없습니다.
          </p>
        ) : (
          data.items.map((p) => (
            <a
              key={p.slug}
              href={`/blogs/${p.slug}`}
              className="block border rounded p-4 hover:shadow"
            >
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-500">{p.subtitle}</p>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
