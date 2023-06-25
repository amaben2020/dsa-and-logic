import express from "express";
import {
  createBlogPost,
  getBlogPosts,
  updateBlogPost,
} from "./../controllers/blog.js";

const blogRouter = express.Router();

blogRouter.post("/", createBlogPost);
// blogRouter.get("/", getAllBlogPosts);
blogRouter.get("/", getBlogPosts);
blogRouter.put("/:id", updateBlogPost);

export default blogRouter;
