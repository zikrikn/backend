const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./route/auth.route.js");
const { MONGO_URL, PORT } = process.env;
// x-www-form-urlencoded
const bodyParser = require("body-parser");
// multipart/form-data
const multer = require('multer');
const upload = multer();

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// app.use(express.json());
app.use(upload.none()); // for parsing multipart/form-data
// Add these lines before defining your routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", authRoute);