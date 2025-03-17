import express from "express";
import dotenv from "dotenv";
import pkg from "body-parser";
import connectDB from "../server/config/db.js";
import userRoutes from "./api/users/usersRoutes.js";

const { json } = pkg;

const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config();

// Middleware
app.use(json());

// Connect Database
connectDB();

// Routes
app.use("/api", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
