import React from 'react'
import Products from './components/Products'
import data from './components/data'
import{Routes,Route} from'react-router-dom'
import PaymentSuccess from './components/PaymentSuccess'
const App = () => {
  return (
  <>
   <Routes>
    <Route path='/' element={<Products data={data}/>}/>
    <Route path='/paymentSuccess' element={<PaymentSuccess/>} />
   </Routes>
  </>
    
   
  )
}

export default App
