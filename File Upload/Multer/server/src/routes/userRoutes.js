const express = require('express');
const { createUser } = require('../controllers/userController');
// const upload = require('../middleware/uploadMiddleware');
const { upload } = require("../config/cloudinary");
const router = express.Router();


// router.post('/register', upload.single('profilePic'), createUser);   // normal multer route
router.post("/register", upload.single("profilePic"), createUser);    //cloudinary route

module.exports = router;
