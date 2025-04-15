import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./api/users/usersRoutes.js";
import User from "./api/users/userModel.js";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend requests
app.use(express.json());

app.get("/message", (req, res) => {
  console.log(req);
  res.json({ message: "Server is running! Hello from the backend!" });
});

// Routes
app.use("/api", userRoutes); // Prefix API routes

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    console.log("Login Attempt:", user); // Console log to debug Log user data

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      user: { _id: user._id, name: user.name || user.username },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Signup Endpoint

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Register request received:", username, password); // Console log for debugging

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      name: username,
      dates: [],
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { _id: newUser._id, name: newUser.name },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Connect to MongoDB and Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
