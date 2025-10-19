// backend/src/posts/controller.ts
import { Request, Response } from 'express';
import { Category } from '@prisma/client';
import { listPosts, getPostBySlug, createPost, updatePostBySlug, deletePostBySlug } from './service';

export async function list(req: Request, res: Response) {
  const { category, keyword, limit, offset, emojis } = req.query as any;
  const emojiTags = typeof emojis === 'string' ? emojis.split(',') : (emojis || []);
  const result = await listPosts({
    category: category as Category | undefined,
    keyword,
    emojiTags,
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
  });
  res.json(result);
}

export async function bySlug(req: Request, res: Response) {
  const post = await getPostBySlug(req.params.slug);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
}

export async function create(req: Request, res: Response) {
  const body = req.body;
  const created = await createPost({
    slug: body.slug,
    title: body.title,
    subtitle: body.subtitle,
    category: body.category,
    contentMd: body.contentMd,
    coverUrl: body.coverUrl,
    visibility: body.visibility,
    language: body.language,
    description: body.description,
    emojis: body.emojis || [],
  });
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const body = req.body;
  try {
    const updated = await updatePostBySlug(req.params.slug, {
      slug: body.slug,
      title: body.title,
      subtitle: body.subtitle,
      category: body.category,
      contentMd: body.contentMd,
      coverUrl: body.coverUrl,
      visibility: body.visibility,
      language: body.language,
      description: body.description,
      emojis: body.emojis || [],
    });
    res.json(updated);
  } catch (e: any) {
    if (e.code === 'P2002') {
      return res.status(409).json({ error: 'Slug already exists' });
    }
    return res.status(500).json({ error: 'Update failed' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deletePostBySlug(req.params.slug);
    res.status(204).send();
  } catch (e: any) {
    return res.status(404).json({ error: 'Not found' });
  }
}
