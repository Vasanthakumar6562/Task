import React from 'react'
import '../styles/Products.css';
import axios from 'axios'

const Products = ({data}) => {
    

    const checkoutHandler =async (amount) => {

        const {data:keyData} = await axios.get('http://localhost:7000/api/getkey');
        const {key} = keyData;
        console.log(key);
        

        const {data: orderData} = await axios.post('http://localhost:7000/api/payment/process',{
            amount
        })
        const {order} = orderData;
        console.log(order);
        

    // Open Razorpay Checkout
      const options = {
        key, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: 'http://localhost:7000/api/paymentVerification', // Your success URL
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    }


  return (
    <div className='products-container'>
        {
            data.map((item)=>(
            <div className='product-card' key={item.id}>
            <img src={item.image} alt='product' className='product-image'/>
            <h3 className='product-title'>{item.title}</h3>
            <p className='product-price'>Price <strong>{item.price}</strong></p>
            <button 
            className='pay-button'
            onClick={()=>checkoutHandler(item.price)}
            >Pay {item.price}</button>
        </div>
            ))
        }
    </div>
  )
}

export default Products
