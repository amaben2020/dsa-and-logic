import {
  deleteUser,
  getUser,
  userCreate,
  getUsers,
} from "../controllers/userCreate.js";
import express from "express";

// instantiating per page prevents conflicts
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", userCreate);
userRouter.put("/:id", userCreate);
userRouter.delete("/:id", deleteUser);

export default userRouter;
