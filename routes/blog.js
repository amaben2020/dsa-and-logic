import express from "express";
import {
  createBlogPost,
  getBlogPosts,
  protectedBlogPosts,
  updateBlogPost,
} from "../controllers/blog/blog.js";
import { protectedBlogRoute } from "../controllers/blog/middleware.js";

const blogRouter = express.Router();

blogRouter.post("/", createBlogPost);
// blogRouter.get("/", getAllBlogPosts);
blogRouter.get("/", protectedBlogRoute, getBlogPosts);
blogRouter.get("/protected", protectedBlogPosts);
blogRouter.put("/:id", updateBlogPost);

export default blogRouter;
