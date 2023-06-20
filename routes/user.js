import {
  deleteUser,
  getUser,
  userCreate,
  getUsers,
} from "../controllers/userCreate.js";
import router from "./index.js";

// route and controller setup for get single item, the route is in the use middleware
// TODO: figure out a way to add this here
// router.get("/users", getUsers);
router.get("/:id", getUser);
router.post("/", userCreate);
router.put("/:id", userCreate);
router.delete("/:id", deleteUser);

export default router;
