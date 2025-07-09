const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const paymentRoute = require ('./route/productRoute')
const connectionDB = require('./config/db');
const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
connectionDB();


app.get('/',(req,res)=>{
  res.send("Payment Mini Task")
})





app.use('/api',paymentRoute)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})




