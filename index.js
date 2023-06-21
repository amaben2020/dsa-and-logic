import mongoose from "mongoose";
import Blog from "./model/Blog.js";
import express from "express";
import MongoDBFactory from "./../mongo/api/services/MongoDB.js";
import User from "./model/User.js";
import bodyParser from "body-parser";
import { userCreate, getUsers } from "./controllers/userCreate.js";
import wiki from "./routes/wiki.js";
import user from "./routes/user.js";
// Set up rate limiter: maximum of twenty requests per minute
import RateLimit from "express-rate-limit";
import morgan from "morgan";
import "dotenv/config";

// Rate limiter so we don't abuse the API
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

// using Mongoose to connect to MongoDB: you're giving those models superpowers which include CRUD ops in the DB.
//  TODO:  extract this later
mongoose.connect(
  `mongodb+srv://algomachine:${process.env.MONGODB_PWD}@cluster0.llk3v.mongodb.net/?retryWrites=true&w=majority`,
);

// Initializing express
const app = express();

// middleware
app.use(bodyParser.json());
app.use(limiter);
app.use(morgan("tiny"));
//  TODO:  extract this later
const routes = [
  { path: "/wiki", route: wiki },
  { path: "/user", route: user },
];

routes.forEach(({ path, route }) => {
  app.use(path, route);
  // app.use("/wiki", wiki);
});

app.get("/users", getUsers);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(` App listening on port ${PORT} 🔥`);
});

// morgan.token('param', function(req, res, param) {
//   return req.params[param];
//   });
