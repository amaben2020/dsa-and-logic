import {
  deleteUser,
  getUser,
  userCreate,
  getUsers,
} from "../controllers/userCreate.js";
import express from "express";
// import router from "./index.js";

// route and controller setup for get single item, the route is in the use middleware
// TODO: figure out a way to add this here
// router.get("/users", getUsers);
// router.get("/:id", getUser);
// router.post("/", userCreate);
// router.put("/:id", userCreate);
// router.delete("/:id", deleteUser);

// instantiating per page prevents conflicts
let userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", userCreate);
userRouter.put("/:id", userCreate);
userRouter.delete("/:id", deleteUser);

export default userRouter;
