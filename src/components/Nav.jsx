import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { currentUser, logout } from '../utils/auth'

export default function Nav(){
  const user = currentUser()
  const navigate = useNavigate()

  function doLogout(){
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="sidebar">
      <div className="brand-sub"><b>Admin Panel</b> </div>
      <div style={{display:'flex', flexDirection:'column', gap:6}}>
        <div className="brand">Codex </div>
         <div className="brand"> Software Solution</div>


        
      </div>

      <div className="menu" style={{marginTop:16}}>
        {/* <NavLink to="/employees" className={({isActive}) => isActive ? 'active' : ''}>Employees</NavLink> */}

        <NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''}>Dashboard</NavLink>
        <NavLink to="/employees" className={({isActive}) => isActive ? 'active' : ''}>Employees</NavLink>
        <NavLink to="/attendance" className={({isActive}) => isActive ? 'active' : ''}>Attendance</NavLink>
        <NavLink to="/salaries" className={({isActive}) => isActive ? 'active' : ''}>Salaries</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>
      </div>

      <div style={{marginTop:'auto'}}>
        {user ? (
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div style={{fontSize:13}}><strong>{user.name || user.username}</strong></div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn btn-ghost" onClick={()=>navigate('/dashboard')}>Profile</button>
              <button className="btn btn-danger" onClick={doLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-primary" onClick={()=>navigate('/login')}>Login</button>
          </div>
        )}
        <div style={{marginTop:12}} className="small"></div>
      </div>
    </nav>
  )
}
