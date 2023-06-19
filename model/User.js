import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Validation: prevents omission of fields
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hobbies: [String],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// arg1: singular form of schema i.e Post, Blog, User etc. This is because this represents what an instance of the model would be not a collection

const User = model("User", userSchema);
export default User;
