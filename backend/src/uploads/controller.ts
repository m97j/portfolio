// backend/src/uploads/controller.ts
import { Request, Response } from 'express';
import { ensureContainer, getUploadSas } from '../utils/azureBlob';

export async function getSas(req: Request, res: Response) {
  const { filename } = req.body;
  if (!filename) return res.status(400).json({ error: 'filename required' });
  await ensureContainer();
  const { uploadUrl, expiresOn } = getUploadSas(filename);
  res.json({ uploadUrl, expiresOn });
}
