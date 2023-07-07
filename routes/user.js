import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  userLogin,
  userRegister,
} from "../controllers/userCreate.js";

// instantiating per page prevents conflicts
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
// userRouter.put("/:id", userCreate);
userRouter.delete("/:id", deleteUser);

export default userRouter;
