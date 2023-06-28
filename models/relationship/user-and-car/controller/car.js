import { default as Car } from "../models/Car.js";

let CarController = {
  find: async (req, res) => {
    let found = await Car.find({ name: req.params.carname });
    res.json(found);
  },
  all: async (req, res) => {
    let allCars = await Car.find({});
    res.json({ allCars });
  },
  create: async (req, res) => {
    const newCar = Car(req.body);
    const savedCar = await newCar.save();
    res.json(savedCar);
  },

  getAllCars: async (req, res) => {
    // only gets us the cars property in the document
    // finds a Car by their name (located in the params)
    let foundCar = Car.find({ name: req.params.carname }).populate("cars");
    res.json({ foundCar });
  },
};

export default CarController;
