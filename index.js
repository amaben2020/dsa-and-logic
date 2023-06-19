import mongoose from "mongoose";
import Blog from "./model/Blog.js";

// using Mongoose to connect to MongoDB
mongoose.connect(
  "mongodb+srv://algomachine:VYSjg9bC3Ce8fNbZ@cluster0.llk3v.mongodb.net/?retryWrites=true&w=majority",
);

// Create a new blog post object
const article = new Blog({
  title: "Awesome Post!",
  slug: "awesome-post",
  published: true,
  content: "This is the best post ever",
  tags: ["featured", "announcement"],
});

// Insert the article in our MongoDB database
// await article.save();

// Find a single blog post
const firstArticle = await Blog.findOne({});
// console.log("finding blog post", firstArticle);

// article.title = "This is just an object, update and save";
// {...article, title: ''} {...(c ? {}: {})}

// article.save();

// console.log("updated", article);

const articleById = await Blog.findById("648f77fb6b702e00ed69f3f7").exec();
// console.log(articleById);

// Projecting data: getting only data needed
// const article = await Blog.findById("62472b6ce09e8b77266d6b1b", "title slug content").exec();
// console.log(article);

// const blog = await Blog.deleteOne({ author: "Jesse Hall" });
// console.log("deleted", blog);

const deleted = await Blog.deleteOne({ _id: "648f77605e5ad5bb89dc8e6f" });
console.log("deleted", deleted);
// const blog = await Blog.deleteMany({ author: "Jesse Hall" })
// console.log(blog)

// service : take in a model, have a create, read, update and delete fx
// const mongo = new MongoDB(Blog).delete("");
// class MongoDB {
//   async delete(id) {
// try catch
//     const res = await Blog.deleteOne({ _id: "648f77605e5ad5bb89dc8e6f" });

//     if (res.deletedCount === 1 && res.acknowledged === true) {
//       return `Item ${id} deleted successfully ✅`
//     }
//   }
// }
