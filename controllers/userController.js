const Auth = require("../model/authModel");

const GetallUser = async (req, res) => {
  try {
    const users = await Auth.find();

    res.status(200).json({
      message: "Data fetched successfully",
      data: users,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const GetUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await Auth.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const UpdateUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await Auth.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User updated",
      data: user,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const DeleteUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await Auth.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User deleted success",
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { GetallUser, GetUserProfile, UpdateUser, DeleteUser };
