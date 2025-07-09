const express = require ('express');
const {processPayment, getKey, paymentVerification} = require('../controller/productController');
const router = express.Router()



router.post('/payment/process', processPayment);
router.get('/getkey',getKey)
router.post('/paymentVerification', paymentVerification);





module.exports = router