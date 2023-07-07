import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import MongoDBFactory from "./../api/services/MongoDB.js";
import Blog from "./../models/Blog.js";

// tbh, there's absolutely no need to create a MongoDB factory, the controller could easily be used to query stuff here. This would in the future limit queries.
const blogModel = new MongoDBFactory(Blog);

const createBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await blogModel.createItem(req?.body);

  res.status(200).json({
    blog: `Blog with ${blogPost?.title} created successfully ✅`,
  });
});

const protectedBlogPosts = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const secret = "jcdkdmklcksmcdmklcsklmdmkldmkls";
  const decodeToken = jwt.decode(token, secret);
  const blogPost = await Blog.find();

  if (!decodeToken || !decodeToken.iat) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }

  res.status(200).json({
    blogPost,
  });
});

const getBlogPosts = asyncHandler(async (req, res) => {
  //FILTERS
  // extract query strings and find them in mongoose
  let queryString = { ...req.query };

  // these fields would only be used in their API feature handlers, these handlers are programmed to utilize the queries
  const excludedStrings = ["sortBy", "fields", "limit", "page"];
  // build up query

  excludedStrings.forEach((item) => {
    if (typeof item === "string") {
      delete queryString[item];
    }
  });

  // for filtering by duration
  if (queryString?.duration) {
    queryString = JSON.parse(
      JSON.stringify(req.query).replace(/\b(gte|gt|lte|lt)\b/g, (m) => `$${m}`),
    );
  }
  // placed directly above the sorter so its overridden if there's a sort in place. This utilizes an object filtration (req.params) mechanism rather than strings.
  // for general filtration
  let query = Blog.find(queryString);

  // sorting: basically it requires passing a string to the model.find(string)
  if (req.query.sort) {
    const sortWithMultipleQuery = req.query.sort.split(",").join(" ");
    query = Blog.find().sort(sortWithMultipleQuery);
  } else {
    query = Blog.find().sort("-createdAt");
  }

  // fields limitation feature
  if (req.query.fields) {
    const fieldsQuery = req.query.fields.split(",").join(" ");
    query = query.select(fieldsQuery);
  } else {
    query = query.select("-__v");
  }

  //PAGINATION
  if (req.query.page || req.query.limit) {
    const page = +req.query.page || 1;
    const limit = +req.query.limit * 1 || 1;

    const skip = Number(page - 1) * Number(limit);

    const blogsCount = Blog.countDocuments();

    if (skip >= blogsCount) {
      throw new Error("Page not found");
    } else {
      query = Blog.find().skip(skip).limit(limit);
    }
  }

  // correct way ✅
  const blogPostsQuery = query.exec();

  const blogPosts = await blogPostsQuery;

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

export {
  createBlogPost,
  getAllBlogPosts,
  getBlogPosts,
  protectedBlogPosts,
  updateBlogPost,
};
