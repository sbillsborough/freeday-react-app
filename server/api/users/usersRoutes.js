import express from "express";
import { createUser, getUsers } from "./usersController.js";

const router = express.Router();

router.post("/users", createUser); // Save user
router.get("/users", getUsers); // Retrieve users

export default router;
