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
//  TODO:  extract this later
mongoose.connect(
  `mongodb+srv://algomachine:${process.env.MONGODB_PWD}@cluster0.llk3v.mongodb.net/?retryWrites=true&w=majority`,
);

//  TODO:  extract this later
const routes = [
  { path: "/wiki", route: wiki },
  { path: "/user", route: user },
];

routes.forEach(({ path, route }) => {
  app.use(path, route);
  // app.use("/wiki", wiki);
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(` App listening on port ${PORT} 🔥`);
});
