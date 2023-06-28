import {
  carRouter,
  userRouter as userRoute,
} from "../models/relationship/user-and-car/routes/index.js";
import blogRouter from "./blog.js";
import tourRouter from "./tour.js";
import userRouter from "./user.js";
import wikiRouter from "./wiki.js";

export const routes = [
  { path: "/wiki", route: wikiRouter },
  { path: "/user", route: userRouter },
  { path: "/blog", route: blogRouter },
  { path: "/tour", route: tourRouter },
  { path: "/users", route: userRoute },
  { path: "/cars", route: carRouter },
];
