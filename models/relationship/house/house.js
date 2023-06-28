const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
});

const House = mongoose.model("House", houseSchema);

// query for all houses
House.find({});
