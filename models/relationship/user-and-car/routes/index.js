import { Router } from "express";
import CarController from "../controller/car.js";
import UserController from "../controller/user.js";

const carRouter = Router();
const userRouter = Router();

userRouter.get("/", UserController.all);
userRouter.post("/create", UserController.create);
userRouter.get("/:username", UserController.find);
userRouter.get("/:username/cars", UserController.getAllCars);

carRouter.get("/", CarController.all);
carRouter.get("/:carname", CarController.find);
carRouter.post("/create", CarController.create);

export { carRouter, userRouter };
