import User from "./userModel.js";

// Save a new user with name and date
export const createUser = async (req, res) => {
  try {
    const { name, dates } = req.body;
    if (!name || !Array.isArray(dates)) {
      return res.status(400).json({
        message:
          "Invalid request format. 'name' must be a string and 'dates' must be an array.",
      });
    }

    const newUser = new User({ name, dates });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res
      .status(500)
      .json({ message: "Failed to save user", error: err.message });
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
