// Import express and cors
const express = require("express");
const cors = require("cors");

// Create the Express application
const app = express();

app.use(cors());
app.use(express.json());

// Create a GET route

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});
