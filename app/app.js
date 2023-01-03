const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("../models/index");

// dependencies
const adminRoute = require("../routes/adminRoutes");
const authRoute = require("../routes/authRoute");

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

// routes
app.use("/user", authRoute);
app.use("/admin", validateToken, validRole, adminRoute);

module.exports = app;
