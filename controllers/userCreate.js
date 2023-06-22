import User from "./../models/User.js";
import MongoDBFactory from "./../api/services/MongoDB.js";
import asyncHandler from "express-async-handler";

// Init User factory
const mongodb = new MongoDBFactory(User);

const userCreate = async (req, res) => {
  const data = req.body;

  try {
    const createdItem = await mongodb.createItem(data);

    return res.status(201).json({
      item: createdItem,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUser = asyncHandler(async (req, res) => {
  // we only need to write code for the case where we assume success, no try-catch needed

  const id = req.params["id"];
  const user = await mongodb.getById(String(id));

  if (user?.email) {
    return res.json({
      user,
    });
  }

  res.send("User does not exist ");
});

const getUsers = async (_, res) => {
  const users = await mongodb.getAll();
  return res.json({
    users,
  });
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params["id"];
    await mongodb.deleteItem(String(id));
    return res.status(200).send(`User successfully deleted ❌`);
  } catch (error) {
    console.log("ERROR", error);
    if (error) {
      return next(error);
    }
  }
};

export { userCreate, getUser, deleteUser, getUsers };

// REGEX
// app.get(/.*fish$/, function (req, res) {
//   // …
// });
