import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";

import { routes } from "./routes/index.js";
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

// middleware:
app.use(bodyParser.json());
app.use(limiter);
app.use(morgan("tiny"));

routes.forEach(({ path, route }) => {
  app.use(path, route);
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(` App listening on port ${PORT} 🔥`);
});
