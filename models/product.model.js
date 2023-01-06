const mongoose = require("mongoose");

const product = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imgPath: { type: String, required: true },
    isSold: { type: Boolean },
    date: { type: Date },
    email: { type: String, required: true },
  },
  { collection: "product-data" }
);
const model = mongoose.model("ProductData", product);
module.exports = model;
