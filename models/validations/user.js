import Joi from "joi";

export const validateUser = (user) => {
  const schema = Joi.object({
    // name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};
