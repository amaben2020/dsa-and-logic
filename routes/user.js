import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  userLogin,
  userRegister,
  updateUser,
} from "../controllers/user/user.js";

// instantiating per page prevents conflicts
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", updateUser);
userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
// userRouter.put("/:id", userCreate);
userRouter.delete("/:id", deleteUser);

export default userRouter;
