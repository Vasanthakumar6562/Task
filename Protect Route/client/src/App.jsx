import React from 'react'
import RegisterForm from './components/RegisterForm'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
   
  
  )
}

export default App
