import { getUser, userCreate } from "../controllers/userCreate.js";
import router from "./index.js";

// route and controller setup for get single item, the route is in the use middleware
router.get("/:id", getUser);
router.post("/", userCreate);

export default router;
