const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/router");
require("./db/connection");

app.use(cors());
app.use(express.json());
app.use(router);
app.use("/uploads", express.static("./uploads"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
