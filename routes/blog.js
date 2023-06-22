import router from "./index.js";
import { createBlogPost } from "./../controllers/blog.js";

router.post("/", createBlogPost);

export default router;
