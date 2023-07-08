import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const protectedBlogRoute = asyncHandler(async (req, _, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const secret = "jcdkdmklcksmcdmklcsklmdmkldmkls";
  const decodeToken = jwt.decode(token, secret);

  try {
    if (!decodeToken || !decodeToken.iat || !token) {
      throw new Error("Something went wrong");
    } else {
      // req.query.name = "Benoski";
      next();
    }
  } catch (error) {
    next(error);
  }
});
