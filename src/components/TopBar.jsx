import React from 'react'
import { useNavigate } from 'react-router-dom'
import { currentUser } from '../utils/auth'

export default function TopBar(){
  const navigate = useNavigate()
  const user = currentUser()

  // return (
  //   <header style={{
  //     height: 60,
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //     padding: '0 18px',
  //     borderBottom: '1px solid rgba(0,0,0,0.04)',
  //     background: 'rgba(255,255,255,0.6)'
  //   }}>
      {/* <div style={{display:'flex', alignItems:'center', gap:16}}>
        <button className="btn btn-ghost" onClick={()=>navigate('/dashboard')}>Home</button>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={()=>navigate('/employees')}>Employees</button>
          <button className="btn" onClick={()=>navigate('/attendance')}>Attendance</button>
          <button className="btn" onClick={()=>navigate('/salaries')}>Salaries</button>
        </div>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div className="small" style={{marginRight:8}}>{user ? user.name : 'Guest'}</div>
        <button className="btn btn-ghost" onClick={()=>navigate('/about')}>About</button>
      </div> */}
    // </header>
  // )
}
