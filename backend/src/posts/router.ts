import { Router } from "express";
import { PostsService } from "./service";
import { adminAuth } from "../auth/middleware";

const router = Router();

router.get("/", async (req, res) => {
  const { category, keyword, language } = req.query as any;
  const items = await PostsService.list({ category, keyword, language });
  res.json(items);
});

router.get("/:slug", async (req, res) => {
  const item = await PostsService.getBySlug(req.params.slug);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// Admin CRUD
router.post("/", adminAuth, async (req, res) => {
  const created = await PostsService.create(req.body);
  res.status(201).json(created);
});

router.put("/:slug", adminAuth, async (req, res) => {
  const updated = await PostsService.update(req.params.slug, req.body);
  res.json(updated);
});

router.delete("/:slug", adminAuth, async (req, res) => {
  await PostsService.delete(req.params.slug);
  res.status(204).send();
});

export default router;
