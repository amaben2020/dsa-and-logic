import express from "express";
import {
  createUser2,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  userLogin,
  userRegister,
} from "../controllers/user/user.js";

// instantiating per page prevents conflicts
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", updateUser);
userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.post("/register-auth0", userRegister);
// userRouter.put("/:id", userCreate);
userRouter.delete("/:id", deleteUser);
userRouter.post("/register-2", createUser2);

export default userRouter;
