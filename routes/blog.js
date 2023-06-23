import express from "express";
import {
  createBlogPost,
  getAllBlogPosts,
  updateBlogPost,
} from "./../controllers/blog.js";

const blogRouter = express.Router();

blogRouter.post("/", createBlogPost);
blogRouter.get("/", getAllBlogPosts);
blogRouter.put("/:id", updateBlogPost);

export default blogRouter;
