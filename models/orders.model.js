const mongoose = require("mongoose");

const orders = new mongoose.Schema(
  {
    email: { type: String, required: true },
    product: { type: String, required: true },
    date: { type: Date },
  },
  { collection: "order-data" }
);

const model = mongoose.model("OrderData", orders);

module.exports = model;
