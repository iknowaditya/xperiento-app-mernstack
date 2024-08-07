const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

//express app..
const app = express();
const PORT = process.env.PORT || 8000;

//require connection..
const { connectMongoDB } = require("./connection");

//require routes..
const userRoutes = require("./routes/user");

//connection..
connectMongoDB(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with failure
  });

//Middleware - plugin..
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable CORS
// app.use(cors());

//Routes..
app.use("/", userRoutes);

//listing PORT...
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
