import { default as User } from "../models/User.js";

let UserController = {
  find: async (req, res) => {
    let found = await User.find({ username: req.params.username });
    res.json(found);
  },
  all: async (req, res) => {
    let allUsers = await User.find({});
    res.json({ allUsers });
  },
  create: async (req, res) => {
    const newUser = User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  },

  getAllCars: async (req, res) => {
    // only gets us the cars property in the document
    // finds a user by their name (located in the params)
    let foundUser = User.find({ name: req.params.username }).populate("cars");
    res.json({ foundUser });
  },
};

export default UserController;
