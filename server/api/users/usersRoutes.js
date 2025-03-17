import express from "express";
import { createUser } from "./usersController.js";

const router = express.Router();

// Route to create user
router.post("/users", createUser);

export default router;
