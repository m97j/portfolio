import { PrismaClient } from "@prisma/client";
import { CreatePostDto, UpdatePostDto } from "../types/post";
const prisma = new PrismaClient();

export const PostsService = {
  list: async (q?: { category?: string; keyword?: string; language?: string }) => {
    return prisma.post.findMany({
      where: {
        category: q?.category,
        language: q?.language,
        visibility: "public",
        OR: q?.keyword
          ? [
              { title: { contains: q.keyword, mode: "insensitive" } },
              { tags: { has: q.keyword } },
              { summary: { contains: q.keyword, mode: "insensitive" } },
              { contentMd: { contains: q.keyword, mode: "insensitive" } }
            ]
          : undefined
      },
      orderBy: { createdAt: "desc" },
      select: {
        title: true, slug: true, summary: true, tags: true, tagString: true,
        coverUrl: true, language: true, createdAt: true
      }
    });
  },

  getBySlug: async (slug: string) =>
    prisma.post.findUnique({ where: { slug } }),

  create: async (dto: CreatePostDto) => {
    if (dto.category === "projects" && (!dto.tags || dto.tags.length === 0)) {
      throw new Error("Projects must have at least one tag");
    }
    return prisma.post.create({ data: dto });
  },

  update: async (slug: string, dto: UpdatePostDto) =>
    prisma.post.update({ where: { slug }, data: dto }),

  delete: async (slug: string) => prisma.post.delete({ where: { slug } })
};
