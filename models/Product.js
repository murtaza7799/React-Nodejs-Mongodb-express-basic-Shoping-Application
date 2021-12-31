const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  price: String,
  brand: String,
  items: String,
  discription: String,
  image: String,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
