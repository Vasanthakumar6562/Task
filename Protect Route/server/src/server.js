const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db'); 

dotenv.config();

const app = express();

//  Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => 
  res.send({message:"Welcome to Auth"}));

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
