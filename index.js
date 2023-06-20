import mongoose from "mongoose";
import Blog from "./model/Blog.js";
import express from "express";
import MongoDBFactory from "./../mongo/api/services/MongoDB.js";
import User from "./model/User.js";
import bodyParser from "body-parser";
import { userCreate } from "./controllers/userCreate.js";
import wiki from "./routes/wiki.js";
import user from "./routes/user.js";

import "dotenv/config";

const app = express();
app.use(bodyParser.json());

// using Mongoose to connect to MongoDB
mongoose.connect(
  `mongodb+srv://algomachine:${process.env.MONGODB_PWD}@cluster0.llk3v.mongodb.net/?retryWrites=true&w=majority`,
);

// User factory
const mongodb = new MongoDBFactory(User);

app.use("/wiki", wiki);
app.use("/user", user);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(` App listening on port ${PORT} 🔥`);
});
