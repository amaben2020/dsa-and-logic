import express from "express";
import { createBlogPost } from "./../controllers/blog.js";

const blogRouter = express.Router();

blogRouter.post("/", createBlogPost);

export default blogRouter;
