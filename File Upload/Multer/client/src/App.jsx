import React from 'react'
import {Routes,Route} from "react-router-dom"
import FileUpload from './pages/FileUpload'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<FileUpload />}/>
    </Routes>
    </>
  )
}

export default App
