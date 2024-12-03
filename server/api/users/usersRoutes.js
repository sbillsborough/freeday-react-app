const express = require("express");
const { createUser } = require("./usersController");

const router = express.Router();

// Route to create user
router.post("/users", createUser);

module.exports = router;
