import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  name: String,
});

const Owner = mongoose.model("Owner", ownerSchema);

const houseSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  // owner: {type: mongoose.Types.ObjectId, ref: "Owner"}
});

const House = mongoose.model("House", houseSchema);

// Create a Owner
const alex = await Owner.create({ name: "Alex Merced" });

// Create a new house
House.create({
  street: "100 Maple Street",
  city: "Fort Townville",
  state: "New West Virgota",
  zip: "77777",
  // owner: alex
});

// query for all houses, use populate to include owner info
House.find({}).populate("owner");
