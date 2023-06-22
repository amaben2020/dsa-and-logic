import MongoDBFactory from "./../api/services/MongoDB.js";
import asyncHandler from "express-async-handler";
import Blog from "./../models/Blog.js";

const blogModel = new MongoDBFactory(Blog);

const createBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await blogModel.createItem(req?.body);
  res.send("Created");
});

export { createBlogPost };
