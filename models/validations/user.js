import Joi from "joi";

export const validateUser = (user) => {
  const schema = Joi.object({
    // name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

// TODO
// caching: call external api and cache on user login and
// create separate endpoint and invalidate cache after sometime
// rabbit mq: Queues, dead-letters, send user a message on a POST endpoint and when the message is sent, push to queue.
//  Aws ec2 or GCP: https://faun.pub/deploying-typescript-node-apps-to-aws-ec2-with-docker-475d5fb189b2
// Containerization: docker and publish the image to AWS
// Unit testing CI/CD. aws,
// Swagger documentation
