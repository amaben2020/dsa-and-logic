import mongoose from "mongoose";
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"], // first argument determined whethere it's required, 2nd argument determine err message
    unique: true, // only allow unique value in this document/collection
    trim: true, // only works for String, remove white space in start and end
  },
  durations: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour should have difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, "A tour must have a description"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String], //Array of string data type
  createdAt: {
    type: Date,
    default: Date.now(),
    // select:false      //excluded this field to be return during http req
  },
  startDates: [Date],
});

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
