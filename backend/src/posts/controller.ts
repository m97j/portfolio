// backend/src/posts/controller.ts
import { Request, Response } from 'express';
import { Category } from '@prisma/client';
import { listPosts, getPostBySlug, createPost, updatePost, deletePost } from './service';

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
    emojis: body.emojis || [], // e.g., ["🟠","⚫"]
  });
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const body = req.body;
  const updated = await updatePost(req.params.id, {
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
}

export async function remove(req: Request, res: Response) {
  await deletePost(req.params.id);
  res.status(204).send();
}
