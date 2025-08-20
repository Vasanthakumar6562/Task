const express = require('express');
const { verifyToken } = require('../middileware/auth');
const { roleCheck } = require('../middileware/roleCheck');
const { userSide, adminSide, superadminSide } = require('../controller/roleController');
const roleRoutes = express.Router();


roleRoutes.get('/user-dashboard',verifyToken,roleCheck(['user']),userSide);
roleRoutes.get('/admin-dashboard',verifyToken,roleCheck(['admin']),adminSide);
roleRoutes.get('/superadmin-dashboard',verifyToken,roleCheck(['superadmin']),superadminSide);




module.exports = roleRoutes