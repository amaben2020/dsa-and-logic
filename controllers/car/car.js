import asyncHandler from "express-async-handler";
import User from "./../../models/User.js";
import Car from "./../../models/relationship/user-and-car/models/Car.js";

export const createCar = asyncHandler(async (req, res) => {
  const { body } = req;

  const newCar = await Car.create({ ...body });

  res.status(201).json({
    car: newCar,
    status: 201,
  });
});

export const addUserToCar = async (req, res) => {
  try {
    const userId = req.query.userId;
    const carId = req.query.carId;

    const user = await User.findOne({ _id: userId });
    const car = await Car.findOneAndUpdate(
      { _id: carId },
      { owner: user._id },
      { new: true },
    );

    res.json({ car });
  } catch (error) {
    console.log(error);
  }
};

export const getCar = asyncHandler(async (req, res) => {
  const car = await Car.find({ _id: req.params.id }).populate("owner");

  res.json({ status: 201, car });
});
