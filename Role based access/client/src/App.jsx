import React from 'react'
import {Routes,Route,Navigate} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import RegisterPage from "./pages/RegisterPage";
import UnauthorizedPage from './pages/UnauthorizedPage'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <Routes>
       <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserPage />
            </ProtectedRoute>
          }
        />

    </Routes>
  )
}

export default App
