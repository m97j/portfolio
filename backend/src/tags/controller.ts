// backend/src/tags/controller.ts
import { Request, Response } from 'express';
import { listTags, getTagByEmoji, upsertTag, deleteTag } from './service';

export async function list(req: Request, res: Response) {
  const tags = await listTags();
  res.json({ items: tags });
}

export async function byEmoji(req: Request, res: Response) {
  const tag = await getTagByEmoji(req.params.emoji);
  if (!tag) return res.status(404).json({ error: 'Not found' });
  res.json(tag);
}

export async function upsert(req: Request, res: Response) {
  const { emoji, label, description } = req.body;
  if (!emoji || !label || !description) return res.status(400).json({ error: 'emoji, label, description required' });
  const t = await upsertTag({ emoji, label, description });
  res.status(201).json(t);
}

export async function remove(req: Request, res: Response) {
  await deleteTag(req.params.emoji);
  res.status(204).send();
}
