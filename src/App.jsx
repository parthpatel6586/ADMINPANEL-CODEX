import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import Nav from './components/Nav'
import TopBar from './components/TopBar'
// import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import EmployeesLayout from './pages/employees/EmployeesLayout'

import ProtectedRoute from './components/ProtectedRoute'

import EmployeesLayout from './pages/employees/EmployeesLayout'
import EmployeesList from './pages/employees/EmployeesList'
import EmployeeAdd from './pages/employees/EmployeeAdd'
import EmployeeEdit from './pages/employees/EmployeeEdit'

import Attendance from './pages/Attendance'
import Salaries from './pages/Salaries'

export default function App(){
  const location = useLocation()
  const hideLayout = location.pathname === "/login"

  return (
    <div className="app" style={{flexDirection: hideLayout ? "column" : "row"}}>
    
      {!hideLayout && <Nav />}

      <div style={{flex:1, minHeight: '100vh'}}>
        
        {!hideLayout && <TopBar />}

        <main className="container" style={{maxWidth: hideLayout ? "100%" : undefined, paddingTop: !hideLayout ? 20 : 40}}>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/employees" element={
              <ProtectedRoute>
                <EmployeesLayout />
              </ProtectedRoute>
            }>
              <Route index element={<EmployeesList />} />
              <Route path="add" element={<EmployeeAdd />} />
              <Route path="edit/:id" element={<EmployeeEdit />} />
            </Route>

            <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
            <Route path="/salaries" element={<ProtectedRoute><Salaries /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
