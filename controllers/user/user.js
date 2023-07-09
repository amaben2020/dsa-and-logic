import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import MongoDBFactory from "../../api/services/MongoDB.js";
import User from "../../models/User.js";
// Init User factory
const mongodb = new MongoDBFactory(User);

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser = {};
  let token = "";

  try {
    existingUser = await User.findOne({ email: email });
    console.log("existingUser", existingUser);

    if (existingUser.email) {
      token = jwt.sign(
        { email: existingUser?.email, id: existingUser._id },
        "jcdkdmklcksmcdmklcsklmdmkldmkls",
        {
          expiresIn: 60 * 60,
        },
      );
    } else {
      throw new Error("No user");
    }

    console.log("token", token);

    if (!existingUser || existingUser?.password != password) {
      const error = Error("Wrong details please check at once");
      return next(error);
    }

    return res.status(201).json({
      user: existingUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const userRegister = async (req, res, next) => {
  const data = req.body;
  try {
    const user = (await User.create(data)).save();
    const token = jwt.sign(
      { email: data?.email, id: data._id },
      "jcdkdmklcksmcdmklcsklmdmkldmkls",
      {
        expiresIn: 60 * 60,
      },
    );
    return res.status(201).json({
      user,
      token,
      status: 201,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res, next) => {
  const data = req.body;
  try {
    const filter = { _id: req.params.id };
    const update = { password: req.body.password };

    const user = await User.findOneAndUpdate(
      filter,
      update,
      // If `new` isn't true, `findOneAndUpdate()` will return the
      // document as it was _before_ it was updated.
      { new: true },
    );

    const updatedUser = await user.save();

    return res.status(201).json({
      updatedUser,
      status: 201,
      statusText: "success",
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
    status: "success",
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

export { deleteUser, getUser, getUsers, updateUser, userLogin, userRegister };

// REGEX
// app.get(/.*fish$/, function (req, res) {
//   // …
// });
