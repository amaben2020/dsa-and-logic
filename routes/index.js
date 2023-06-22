import blogRouter from "./blog.js";
import userRouter from "./user.js";
import wikiRouter from "./wiki.js";

export const routes = [
  { path: "/wiki", route: wikiRouter },
  { path: "/user", route: userRouter },
  { path: "/blog", route: blogRouter },
];
