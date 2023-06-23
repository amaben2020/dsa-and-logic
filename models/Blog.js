import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Validation: prevents omission of fields
const blogSchema = new Schema({
  title: {
    // When including validation on a field, we pass an object as its value.
    type: String,
    required: true,
  },
  slug: {
    type: String,
    // required: true,
    lowercase: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
    // required: true,
  },
  content: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: Date,
  // comments: [
  //   {
  //     user: String,
  //     content: String,
  //     votes: Number,
  //   },
  // ],
});

// arg1: singular form of schema i.e Post, Blog, User etc. This is because this represents what an instance of the model would be not a collection

const Blog = model("Blog", blogSchema);
export default Blog;
