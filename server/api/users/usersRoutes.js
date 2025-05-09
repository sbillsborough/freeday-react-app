import express from "express";
import { createUser, getUsers, updateUser } from "./usersController.js";

const router = express.Router();

router.post("/users", createUser); // Save user
router.get("/users", getUsers); // Retrieve users
router.put("/users/:id", updateUser); // Update user by ID
router.get("/users/:id", getUserById); // Get user by ID

export default router;
