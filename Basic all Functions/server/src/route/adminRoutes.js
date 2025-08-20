
const express = require("express");
const { createUser, getAllUsers } = require("../controller/adminController");
const { verifyToken } = require("../middileware/auth");
const { roleCheck } = require("../middileware/roleCheck");

const router = express.Router();

// Admin can manage users
router.post("/create-user", verifyToken, roleCheck(["admin"]), createUser);
router.get("/users", verifyToken, roleCheck(["admin"]), getAllUsers);

module.exports = router;
