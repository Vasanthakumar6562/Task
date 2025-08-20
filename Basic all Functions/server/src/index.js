const express = require('express');
const dotenv = require('dotenv');
const connectionDB = require('./config/db');
const user = require('./route/userRoutes');
const role = require('./route/roleCheck');
const superadminCreation = require('../superadmin');
const superadminRoutes = require("./route/superadminRoutes");
const adminRoutes = require("./route/adminRoutes");
const app = express();


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
connectionDB();
 superadminCreation()


app.get('/',(req,res)=>{
  res.send("Role access")
})





app.use('/api',user)
app.use('/api',role)
app.use("/api/superadmin", superadminRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})




