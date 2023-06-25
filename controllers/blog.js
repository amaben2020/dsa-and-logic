import asyncHandler from "express-async-handler";
import MongoDBFactory from "./../api/services/MongoDB.js";
import Blog from "./../models/Blog.js";

const blogModel = new MongoDBFactory(Blog);

const createBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await blogModel.createItem(req?.body);

  res.status(200).json({
    blog: `Blog with ${blogPost.title} created successfully ✅`,
  });
});

const getBlogPosts = asyncHandler(async (req, res) => {
  //FILTERS
  // extract query strings and find them in mongoose
  let queryString = { ...req.query };
  // exclude the sort for now
  const excludedStrings = ["sortBy", "fields", "limit", "page"];
  // build up query

  excludedStrings.forEach((el) => {
    delete queryString[el];
  });

  const blogPosts = await blogModel.find({ ...queryString }).select("-__v");

  res.json({
    length: blogPosts.length,
    blogPosts,
    status: 200,
  });
});

const getAllBlogPosts = asyncHandler(async (_, res) => {
  const blogPost = await blogModel.getAll();

  res.json({
    blogPost,
    status: 201,
  });
});

// model.update()

// findOpeAndUpdate({name: ""}, after{name: "Ben", age: 22}, {new:true}, (error, data) => {if(error){clg} clg(data) })
// findOpeAndUpdate({}) returns the old record
const updateBlogPost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const blogPost = await blogModel?.updateItem(id, "title", req.body.title);
  console.log(blogPost);
  res.status(200).json({
    blog: `Blog with id - ${req.params.id} updated successfully ✅`,
  });
});

export { createBlogPost, getAllBlogPosts, getBlogPosts, updateBlogPost };
