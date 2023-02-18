const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("../models/index");

// dependencies
const adminRoute = require("../routes/adminRoutes");
const authRoute = require("../routes/authRoute");
const userRoute = require("../routes/userRoutes");

// middleware expression
const { validateToken } = require("../middleware/JWT");
const { validRole } = require("../middleware/validRole");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// database connection
db.sequelize.sync();

db.sequelize
  .query(
    `ALTER TABLE directories ADD FOREIGN KEY (userId) REFERENCES users(user_id)`
  )
  .then(() => {
    console.log("Foreign key constraint added successfully!");
  })
  .catch((error) => {
    console.error("Error adding foreign key constraint:", error);
  });

// routes
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/admin", validateToken, validRole, adminRoute);

module.exports = app;
