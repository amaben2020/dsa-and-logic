import expressAsyncHandler from "express-async-handler";
import pkg from "express-openid-connect";

const { requiresAuth } = pkg;

const userRegisterWithAuth0 = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);
});
