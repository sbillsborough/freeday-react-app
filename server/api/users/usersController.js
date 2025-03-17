import User from "./userModel.js"; // Ensure the correct file path

// Save a new user
export const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newUser = await User.create({ name });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
};
