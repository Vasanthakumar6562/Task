const express = require('express');
const cors = require('cors');
const path = require('path');
const employeeRoutes = require('./route/employeeRoutes');
const connectDB = require('./config/db');
const dotenv = require ('dotenv')
const fs = require('fs');

dotenv.config()

const app = express();
connectDB();


// Ensure uploads folder exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadPath));

// Routes
app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Employee Management App');
});


const PORT = process.env.PORT  
app.listen(PORT,()=>console.log(`Server is Running on ${PORT}`))