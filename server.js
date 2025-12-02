const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8000;

const studentRouter = require("./routes/students");

const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());
app.use("/students", studentRouter);

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connection Established"));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
