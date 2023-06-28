import mongoose, { Schema } from "mongoose";

// create a User with cars
const CarModel = new Schema({
  name: String,
  age: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Car = mongoose.model("Car", CarModel);

export default Car;
