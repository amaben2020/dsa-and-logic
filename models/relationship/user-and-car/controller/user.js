const { default: User } = require("../models/User");

let UserController = {
  find: async (req, res) => {
    let found = User.find({ name: req.params.username });
    res.json(found);
  },
  all: async (req, res) => {
    let allUsers = User.find();
    res.json(allUsers);
  },
  create: async (req, res) => {
    let newUser = User.create(req.body);
    let savedUser = await newUser.save();
    res.json(savedUser);
  },
  getAllCars: async (req, res) => {
    // only gets us the cars property in the document
    // finds a user by their name (located in the params)
    let foundUser = User.find({ name: req.params.username }).populate("cars");
    res.json(foundUser);
  },
};
