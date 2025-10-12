import express from "express";
import cors from "cors";
import postsRouter from "./posts/router";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true }));
app.use("/api/posts", postsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
