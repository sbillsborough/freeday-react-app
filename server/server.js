require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./api/users/usersRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());

// Connect Database
connectDB();

// Routes
app.use("/api", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
