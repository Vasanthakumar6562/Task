const express = require('express');
const { Register, login, getMyProfile, updateMyProfile } = require('../controller/userController');
const upload = require('../middileware/upload');
const { verifyToken } = require('../middileware/auth');
const userRoutes = express.Router()



userRoutes.post('/register',Register);
userRoutes.post('/',login)

// Protected routes
userRoutes.get("/me", verifyToken, getMyProfile);
userRoutes.put("/me/update", verifyToken, upload.single("avatar"), updateMyProfile);



module.exports = userRoutes