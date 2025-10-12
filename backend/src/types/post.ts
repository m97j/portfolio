export type CreatePostDto = {
  title: string;
  slug: string;
  category: "projects" | "vlogs" | "notes";
  tags: string[];
  tagString?: string;
  summary?: string;
  contentMd: string;
  visibility: "public" | "private";
  language: "ko" | "en";
  githubUrl?: string;
  coverUrl?: string;
};
export type UpdatePostDto = Partial<CreatePostDto>;
