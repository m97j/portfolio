// backend/src/tags/service.ts
import { prisma } from '../utils/prisma';
import { Tag } from '@prisma/client';

export async function listTags() {
  return prisma.tag.findMany({ orderBy: { label: 'asc' } });
}

export async function getTagByEmoji(emoji: string) {
  return prisma.tag.findUnique({ where: { emoji } });
}

export async function upsertTag(input: { emoji: string; label: string; description: string }) {
  return prisma.tag.upsert({
    where: { emoji: input.emoji },
    update: { label: input.label, description: input.description },
    create: { emoji: input.emoji, label: input.label, description: input.description },
  });
}

export async function deleteTag(emoji: string) {
  return prisma.tag.delete({ where: { emoji } });
}
