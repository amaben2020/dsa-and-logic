import bcrypt from "bcrypt";
import crypto from "crypto";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import MongoDBFactory from "../../api/services/MongoDB.js";
import Token from "../../models/Token.js";
import User from "../../models/User.js";
import { validateUser } from "../../models/validations/user.js";
// Init User factory
const mongodb = new MongoDBFactory(User);

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser = {};
  let existingToken = {};
  let token = "";

  try {
    existingUser = await User.findOne({ email: email });
    existingToken = await Token.findOne({ userId: existingUser?._id });

    if (!existingToken?.token || !existingUser?.email) {
      res.send("User doesn't exist");
    }

    const match = await bcrypt.compare(password, existingUser?.password);

    if (!match) {
      res.send("Wrong Password");
    }

    const jwtTokenExpiry = jwt.decode(existingToken?.token);

    const today = Date.now();
    const isTokenValid = jwtTokenExpiry.exp * 1000 >= today;

    if (existingUser.email && match) {
      // check if token hasn't expired,
      if (isTokenValid) {
        token = existingToken?.token;
      } else {
        //  else create new one
        token = jwt.sign(
          { email: existingUser?.email, id: existingUser._id },
          "jcdkdmklcksmcdmklcsklmdmkldmkls",
          {
            expiresIn: 60 * 60,
          },
        );
      }
    } else {
      throw new Error("No user");
    }

    res.status(201).json({
      user: existingUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const userRegister = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { error } = validateUser(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      email,
      password: hash,
    });

    const savedUser = user.save();

    let generateToken;
    if (savedUser) {
      generateToken = await Token.create({
        // not sure if populate is necessary here since we're simply retrieving the id.
        userId: await User.findOne({ email: user?.email })
          .populate("_id")
          .exec(),

        token: jwt.sign(
          { email: savedUser?.email, id: savedUser?._id },
          crypto.randomBytes(32).toString("hex"),
          { expiresIn: 60 * 60 },
        ),
      });
    }

    // req.headers.cookies = generateToken;

    return res.status(201).json({
      user,
      token: generateToken?.token,
      status: 201,
      statusText: "User registered successfully ✅",
    });
  } catch (error) {
    console.log("ERROR HERE", error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const data = req.body;
  try {
    const filter = { _id: req.params.id };
    const update = { password: req.body.password };
    // docs: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
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

const createUser2 = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const checkIfUserExists = await User.find({ email });
  console.log("checkIfUserExists", checkIfUserExists);
  if (checkIfUserExists?.length) {
    res.status(401).send("User already exists, please try another email");
  }

  // create an email and password with bcrypt

  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);

  const encryptedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    email,
    password: encryptedPassword,
  });

  console.log("newUser", newUser);

  // generate token with jwt

  const userToken = jwt.sign({ ...newUser }, "shhhhh");

  console.log("userToken", userToken);

  // pass the token to the token model for storage based on userId

  const generatedToken = await Token.create({
    userId: newUser.id,
    token: userToken,
  });

  // return user created

  res.status(201).json({
    user: newUser,
    generatedToken,
  });
});

export {
  createUser2,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  userLogin,
  userRegister,
};

// REGEX
// app.get(/.*fish$/, function (req, res) {
//   // …
// });
