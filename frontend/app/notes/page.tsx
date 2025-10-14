// frontend/app/notes/page.tsx
import { PostsAPI } from "@/lib/api";

export default async function NotesPage() {
  const params = new URLSearchParams();
  let data: { items: any[] } = { items: [] };

  try {
    data = await PostsAPI.list("notes", params);
  } catch (e) {
    console.error("Failed to fetch notes:", e);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Study Notes</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data.items.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            아직 노트가 없습니다.
          </p>
        ) : (
          data.items.map((p) => (
            <a key={p.slug} href={`/notes/${p.slug}`} className="block border rounded p-4">
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-500">{p.subtitle}</p>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
