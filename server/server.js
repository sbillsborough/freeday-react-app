import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./api/users/usersRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend requests
app.use(express.json());

app.get("/message", (req, res) => {
  console.log(req);
  res.json({ message: "Hello from the backend!" });
});

// Routes
app.use("/api", userRoutes); // Prefix API routes

// Connect to MongoDB and Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
