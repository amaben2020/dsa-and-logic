import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Roles = {
  USER: "USER",
  ADMIN: "ADMIN",
};

// Validation: prevents omission of fields
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "User must have an email address"],
  },
  password: {
    type: String,
    required: true,
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // hobbies: [String],
  // isAdmin: {
  //   type: Boolean,
  //   default: false,
  // },

  // roles: {
  //   type: [String],
  //   enum: Object.keys(Roles),
  //   default: Roles.USER,
  // },
});

// arg1: singular form of schema i.e Post, Blog, User etc. This is because this represents what an instance of the model would be not a collection

const User = model("User", userSchema);

export default User;
