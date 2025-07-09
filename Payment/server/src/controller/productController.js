const instance = require ('../utils/razorpayInstance')
const dotenv = require('dotenv')
const crypto = require('crypto')
dotenv.config()



const processPayment = async (req,res) => {
    const options = {
        amount : Number(req.body.amount * 100), //
        currency :"INR"
    }

    const order = await instance.orders.create(options)
    


 res.status(200).json({ 
    success: true,
    order:order
});
}



const getKey =  (req,res) => {
    res.status(200).json({
        key:process.env.RAZORPAY_API_KEY
    })
}



const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

    console.log(`RAZORPAY_SIGNATURE: ${razorpay_signature}`)
        console.log(`EXPECTED_SIGNATURE : ${expectedSignature}`);
        

    
  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
   return res.redirect(`http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`);

    // res.status(200).json({ success: true, message: "Payment verified" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};


module.exports = {
    processPayment,
    getKey,
    paymentVerification
}


