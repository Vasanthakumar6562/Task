const Razorpay = require('razorpay');
const dotenv = require ('dotenv');



dotenv.config()


const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
console.log("Loaded key:", process.env.RAZORPAY_API_KEY);
console.log("Loaded secret:", process.env.RAZORPAY_API_SECRET);



module.exports =  instance ;