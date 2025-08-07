const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");
const dotenv = require ("dotenv");
const router = require("./routes/userRoutes");
const protectRouter = require("./routes/protectedRoutes")
const ConnectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

ConnectDB()



app.get('/',(req,res)=>{
    res.send("Role Based Authentication")
})

app.use("/api/auth",router);
app.use("/api/protected",protectRouter);



const PORT = process.env.PORT 

app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`);
    
})