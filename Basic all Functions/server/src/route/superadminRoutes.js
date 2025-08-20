
const express = require("express");
const { createAdmin } = require("../controller/superadminController");
const { verifyToken } = require("../middileware/auth");
const { roleCheck } = require("../middileware/roleCheck");

const router = express.Router();

// Superadmin can create Admins
router.post("/create-admin", verifyToken, roleCheck(["superadmin"]), createAdmin);

module.exports = router;
