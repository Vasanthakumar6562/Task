import React from 'react'
import EmployeeForm from './components/EmployeeForm'
import { Route, Routes } from 'react-router-dom'
import EmployeeTable from './components/EmployeeTable'

const App = () => {
  return (
    
    <Routes>
      <Route path='/' element={<EmployeeForm />}/>
      <Route path='/employee' element={<EmployeeTable />} />
      <Route path="/employee/edit/:id" element={<EmployeeForm />} />  {/* For editing */}
    </Routes>
  )
}

export default App
