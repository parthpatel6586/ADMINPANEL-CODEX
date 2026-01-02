import React from 'react'
import { Navigate } from 'react-router-dom'
import { currentUser } from '../utils/auth'

export default function ProtectedRoute({ children }){
  const user = currentUser()
  if(!user) return <Navigate to="/login" replace />
  return children
}
