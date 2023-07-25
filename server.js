import bodyParser from "body-parser";
import express from "express";

import mongoose from "mongoose";

import { routes } from "./routes/index.js";
// Set up rate limiter: maximum of twenty requests per minute
import cors from "cors";
import "dotenv/config.js";
import RateLimit from "express-rate-limit";
import morgan from "morgan";
import Product from "./models/relationship/user-and-car/models/Product.js";
import Review from "./models/relationship/user-and-car/models/Review.js";

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "vjGcr1lUeOTE4pNa7lpn9ge3xLIRe6ju",
  issuerBaseURL: "https://dev-n34rdis4.us.auth0.com",
};

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

app.use(
  cors({
    // all origins are allowed
    origin: "*",
  }),
);

routes.forEach(({ path, route }) => {
  app.use(path, route);
});

// to extract later after learning

// Route to get all products
app.get("/products", function (req, res) {
  Product.find({})
    .then(function (dbProducts) {
      res.json(dbProducts);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Route to get all reviews
app.get("/reviews", function (req, res) {
  Review.find({})
    .then(function (dbReviews) {
      res.json(dbReviews);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/", (req, res) => {
  res.send("Running");
});

// Route for creating a new Product
app.post("/product", async function (req, res) {
  try {
    const product = Product(req.body);

    const dbProduct = await product.save();

    res.json(dbProduct);
  } catch (error) {
    console.log(error);
  }
});

// Route for creating a new Review and updating Product "review" field with it
app.post("/product/:id", async function (req, res) {
  try {
    // Create a new note and pass the req.body to the entry
    const review = await Review(req.body);

    const productWithReview = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reviews: review._id } },
      { new: true },
    );

    res.json(productWithReview);
  } catch (error) {
    console.log(error);
  }
});

// Route for retrieving a Product by id and populating it's Review.
app.get("/products/:id", async function (req, res) {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate(
      "reviews",
    );

    res.json(product);
  } catch (error) {
    console.log(error);
    // process.exit(0);
  }
});

const PORT = 5001;
// importData();
app.listen(PORT, () => {
  console.log(` App listening on port ${PORT} 🔥`);
});
