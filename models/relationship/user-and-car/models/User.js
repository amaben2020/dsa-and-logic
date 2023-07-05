import mongoose, { Schema } from "mongoose";

// create a User with cars
const UserModel2 = new Schema({
  username: {
    type: String,
    required: [true, "User must have a username"],
  },
  age: {
    type: String,

    required: [true, "User must have an age"],
  },
  // array means many
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const User2 = mongoose.model("User2", UserModel2);

export default User2;
