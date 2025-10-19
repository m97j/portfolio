// backend/src/posts/service.ts
import { prisma } from '../utils/prisma';
import { Category, Prisma } from '@prisma/client';

export async function listPosts(params: {
  category?: Category;
  keyword?: string;
  emojiTags?: string[];
  limit?: number;
  offset?: number;
}) {
  const { category, keyword, emojiTags, limit = 20, offset = 0 } = params;
  const where: Prisma.PostWhereInput = {
    visibility: 'public',
    ...(category ? { category } : {}),
    ...(keyword ? {
      OR: [
        { title: { contains: keyword, mode: 'insensitive' } },
        { subtitle: { contains: keyword, mode: 'insensitive' } },
        { contentMd: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ]
    } : {}),
    ...(emojiTags?.length ? {
      tags: { some: { tag: { emoji: { in: emojiTags } } } }
    } : {}),
  };
  const [items, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { tags: { include: { tag: true } } },
      skip: offset, take: limit,
    }),
    prisma.post.count({ where }),
  ]);
  return { items, total };
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { tags: { include: { tag: true } } },
  });
}

export async function connectTagsByEmojis(postId: string, emojis: string[]) {
  if (!emojis?.length) {
    await prisma.tagOnPost.deleteMany({ where: { postId } });
    return;
  }
  const tagRecords = await prisma.tag.findMany({ where: { emoji: { in: emojis } } });
  await prisma.tagOnPost.deleteMany({ where: { postId } });
  await prisma.tagOnPost.createMany({
    data: tagRecords.map(t => ({ postId, tagId: t.id })),
    skipDuplicates: true,
  });
}

export async function createPost(data: {
  slug: string;
  title: string;
  subtitle?: string;
  category: Category;
  contentMd: string;
  coverUrl?: string;
  visibility?: string;
  language?: string;
  description?: string;
  emojis?: string[];
}) {
  const post = await prisma.post.create({
    data: {
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      category: data.category,
      contentMd: data.contentMd,
      coverUrl: data.coverUrl,
      visibility: data.visibility ?? 'public',
      language: data.language,
      description: data.description,
    },
  });
  await connectTagsByEmojis(post.id, data.emojis || []);
  return await getPostBySlug(post.slug);
}

export async function updatePostBySlug(slug: string, data: {
  slug?: string;
  title?: string;
  subtitle?: string;
  category?: Category;
  contentMd?: string;
  coverUrl?: string;
  visibility?: string;
  language?: string;
  description?: string;
  emojis?: string[];
}) {
  const post = await prisma.post.update({
    where: { slug },
    data: {
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      category: data.category,
      contentMd: data.contentMd,
      coverUrl: data.coverUrl,
      visibility: data.visibility,
      language: data.language,
      description: data.description,
    },
  });
  if (data.emojis) await connectTagsByEmojis(post.id, data.emojis);
  return await getPostBySlug(post.slug);
}

export async function deletePostBySlug(slug: string) {
  await prisma.post.delete({ where: { slug } });
}
