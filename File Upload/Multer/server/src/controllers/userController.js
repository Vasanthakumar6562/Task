const path = require("path");
const User = require("../models/User");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, skills } = req.body;

    // Handle file upload
    const profileImage = req.file ? req.file.filename : null;

    // Validate required fields
    if (!name || !email || !skills) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      skills: Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim()),
      profileImage
    });
     console.log(newUser);
     
    res.status(201).json({
      message: "User created successfully",
      user: newUser
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  createUser
};
