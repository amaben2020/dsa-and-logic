import express from "express";
import { addUserToCar, createCar, getCar } from "./../controllers/car/car.js";

const carRouter = express.Router();

carRouter.post("/", createCar);
carRouter.get("/:id", getCar);
carRouter.post("/addUserToCar", addUserToCar);
// // carRouter.get("/", getAllBlogPosts);
// carRouter.get("/published-blog", getPublishedBlogPosts, getBlogPosts);
// carRouter.get("/", protectedBlogRoute, getBlogPosts);
// carRouter.get("/protected", protectedBlogPosts);
// carRouter.put("/:id", updateBlogPost);

export default carRouter;
