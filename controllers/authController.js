const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/authModel");

const register = async (req, res) => {
  try {
    const { avatar, fullName, email, password, role} = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered." });
    }

    const newUser = new User({
      avatar,
      fullName,
      email,
      password,
      role
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Authenticate user...
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        _id: user.id, 
        email: user.email,
        username: user.username,
        role: user.role, // Optional: Include role if needed
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ message: "User login successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
