const express = require('express');
const router = express.Router();
const { createEmployee, getAllEmployees, updateEmployee, deleteEmployee, getEmployeeById } = require('../controller/employeeController');
const upload = require('../middleware/multer');


// Routes
router.post('/', upload.single('profileImage'),createEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', upload.single('profileImage'),updateEmployee);
router.delete('/:id',deleteEmployee );

module.exports = router;
