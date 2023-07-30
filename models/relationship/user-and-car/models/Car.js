import mongoose, { Schema } from "mongoose";

// create a User with cars
const CarModel = new Schema({
  brand: {
    type: String,
    enum: ["mercedes", "bmw", "toyota", "hyundai", "nissan"],
  },
  yearOfManufacture: Number,
  mileage: Number,
  condition: {
    type: String,
    enum: ["new", "used"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Car = mongoose.model("Car", CarModel);

export default Car;
