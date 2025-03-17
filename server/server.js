import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./api/users/usersRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());

// Connect Database
connectDB();

// Routes
app.use("/api", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
