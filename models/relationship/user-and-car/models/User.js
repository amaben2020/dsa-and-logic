import mongoose, { Schema } from "mongoose";

// create a User with cars
const UserModel = new Schema({
  name: String,
  age: String,
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const User = mongoose.model("User", UserModel);

export default User;
