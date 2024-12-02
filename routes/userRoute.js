const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {
  GetUserProfile,
  UpdateUser,
  DeleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Admin routes
// router.use(verifyToken("admin"));
// router.get("/admin", GetallUser);
// router.route("/:id").get(GetuserbyId).put(UpdateUser).delete(DeleteUser);

// User routes

router.get("/me", verifyToken("user", "admin"), GetUserProfile);
router.put("/update-profile", verifyToken("user", "admin"), UpdateUser);
router.delete("/delete-profile", verifyToken("user", "admin"), DeleteUser);

module.exports = router;
