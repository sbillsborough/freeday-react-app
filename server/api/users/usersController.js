import User from "./userModel.js";

// Save a new user with name and date
export const createUser = async (req, res) => {
  try {
    const { name, date } = req.body;
    if (!name || !date) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newUser = await User.create({ name, date });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Name and date are required" });
  }
};

// Fetch all users (for debugging or display)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};
