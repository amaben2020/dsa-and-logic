import getAllTours from "../controllers/tours/tours.js";
import express from "express";

// instantiating per page prevents conflicts
const tourRouter = express.Router();

tourRouter.get("/", getAllTours);

export default tourRouter;
