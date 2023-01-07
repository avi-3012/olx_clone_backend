const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const user = require("../models/user.model");
const product = require("../models/product.model");
const orders = require("../models/orders.model");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const moment = require("moment");
require("../db/connection");

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.jpg`);
  },
});

const imgFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({ storage: imgStorage, fileFilter: imgFilter });

router.post("/api/users/register", async (req, res) => {
  try {
    const User = await user.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
});

router.post("/api/users/login", async (req, res) => {
  const User = await user.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (User) {
    const accessToken = jwt.sign(
      { userId: User.name, email: User.email },
      "ecommercesecretkey"
    );
    res.json({ status: "ok", token: accessToken });
  } else {
    res.json({ status: "error", error: "Invalid username/password" });
  }
});

router.post("/api/sell", upload.single("image"), async (req, res) => {
  const token = req.body.token;
  try {
    const verification = jwt.verify(token, "ecommercesecretkey");
    const email = verification.email;
    const userFound = await user.findOne({ email: email });
    if (userFound) {
      try {
        const date = moment().format("YYYY-MM-DD");
        const Product = new product({
          name: req.body.name,
          price: req.body.price,
          imgPath: req.file.filename,
          isSold: false,
          date: date,
          email: req.body.email,
        });
        const productRes = await Product.save();
        res.json({ status: "ok" });
      } catch (error) {
        res.json({ status: "error", error: error });
      }
    }
  } catch (error) {
    res.json({ status: "error", error: "Invalid token" });
  }
});

router.get("/api/users/verify", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const verification = jwt.verify(token, "ecommercesecretkey");
    const email = verification.email;
    const userFound = await user.findOne({ email: email });
    if (userFound) {
      return res.json({ status: "ok", email: email });
    }
  } catch (error) {
    res.json({ status: "error", error: "Invalid token" });
  }
});

router.get("/api/products", async (req, res) => {
  const products = await product.find({ isSold: false });
  res.json({ status: "ok", products: products });
});

router.get("/api/product/:id", async (req, res) => {
  product.findById(req.params.id, (err, productData) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ status: "ok", product: productData });
  });
});

router.post("/api/products/buy/:id", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const verification = jwt.verify(token, "ecommercesecretkey");
    const email = verification.email;
    const userFound = await user.findOne({ email: email });
    if (userFound) {
      const productId = req.params.id;
      const productFound = await product.findOne({
        _id: productId,
        isSold: false,
      });
      if (productFound) {
        const productRes = await product.updateOne(
          { _id: productId },
          { isSold: true }
        );
        const order = new orders({
          email: email,
          product: productId,
          date: moment().format("YYYY-MM-DD"),
        });
        const orderRes = await order.save();
        if (productRes && orderRes) {
          res.json({ status: "ok" });
        } else {
          res.json({ status: "error", error: "Error while buying product" });
        }
      } else {
        res.json({
          status: "error",
          error: "Product not found in Unsold list.",
        });
      }
    }
  } catch (error) {
    res.json({ status: "error", error: "Invalid token" });
  }
});

router.get("/api/account/myorders/:id", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const verification = jwt.verify(token, "ecommercesecretkey");
    const email = verification.email;
    const userFound = await user.findOne({ email: email });
    if (userFound) {
      const userId = req.params.id;
      const MyOrders = await orders.find({ email: userId });
      res.json({ status: "ok", orders: MyOrders });
    }
  } catch (error) {
    res.json({ status: "error", error: "Invalid token" });
  }
});

router.get("/api/account/myproducts/:id", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const verification = jwt.verify(token, "ecommercesecretkey");
    const email = verification.email;
    const userFound = await user.findOne({ email: email });
    if (userFound) {
      const MyProducts = await product.find({ email: email });
      res.json({ status: "ok", products: MyProducts });
    }
  } catch (error) {
    res.json({ status: "error", error: "Invalid token" });
  }
});

router.get("/", (req, res) => {
  res.send("Hello World!");
});
//http://localhost:5000/uploads/
module.exports = router;
