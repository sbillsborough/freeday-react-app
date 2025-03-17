import express from "express";
import { createUser } from "./usersController.js"; // Ensure the correct file path

const router = express.Router();

// Route to create a user
router.post("/users", createUser);

export default router;
