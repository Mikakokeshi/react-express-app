const express = require("express");
// const { listen } = require("./app");
const { PrismaClient } = require("@prisma/client");
const app = express();
const PORT = 8000;

const prisma = new PrismaClient();
app.use(express.json());

app.post("/api", async (req, res) => {
  const { title, body, created_at, updated_at } = req.body;
  const posts = await prisma.post.create({
    data: {
      title: title,
      body: body,
      created_at: created_at,
      updated_at: updated_at,
    },
  });
  return res.json(posts);
});

app.get("/api", async (req, res) => {
  const posts = await prisma.post.findMany();
  return res.json(posts);
});

app.get("/api/:id", async (req, res) => {
  const id = req.params.id;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.json(post);
});

app.put("/api/:id", async (req, res) => {
  const id = req.params.id;
  const { title, body, created_at, updated_at } = req.body;
  const updatedPost = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title: title,
      body: body,
      created_at: created_at,
      updated_at: updated_at,
    },
  });
  return res.json(updatedPost);
});

app.delete("/api/:id", async (req, res) => {
  const id = req.params.id;
  const deletedPost = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json(deletedPost);
});

app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
