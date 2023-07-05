import mongoose from "mongoose";

// Get the Schema constructor
const Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  // one Product can have many reviews
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Create model from the schema
const Product = mongoose.model("Product", ProductSchema);

// Export model
export default Product;
