import express from "express";
import {
  createBlogPost,
  getBlogPosts,
  protectedBlogPosts,
  updateBlogPost,
} from "./../controllers/blog.js";

const blogRouter = express.Router();

blogRouter.post("/", createBlogPost);
// blogRouter.get("/", getAllBlogPosts);
blogRouter.get("/", getBlogPosts);
blogRouter.get("/protected", protectedBlogPosts);
blogRouter.put("/:id", updateBlogPost);

export default blogRouter;
