import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const protectedBlogRoute = asyncHandler(async (req, _, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const secret = "jcdkdmklcksmcdmklcsklmdmkldmkls";
  const decodeToken = jwt.decode(token, secret);

  try {
    if (!decodeToken || !decodeToken.iat || !token) {
      throw new Error("Please authenticate yourself, no token available");
    } else {
      // req.query.name = "Benoski";
      next();
    }
  } catch (error) {
    next(error);
  }
});

export const getPublishedBlogPosts = asyncHandler((req, res, next) => {
  // return only published blogposts
  console.log(req.query);
  req.query.published = true;

  if (req.query.published) {
    next();
  } else {
    console.log("Not callable");
  }
});
