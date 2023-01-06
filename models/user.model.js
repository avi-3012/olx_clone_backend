const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", user);

module.exports = model;
