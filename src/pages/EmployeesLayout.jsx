import React from 'react'
import { NavLink, Outlet } from 'react-router-dom' 
 

export default function EmployeesLayout(){
  return (
    <div>
      <div className="card header" style={{alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <h2>Employees</h2>
          <div className="small">Manage staff: view, add, edit</div>
        </div>

        <div style={{display:'flex', gap:8}}>
          <NavLink to="/employees" end className={({isActive}) => isActive ? 'btn btn-primary' : 'btn btn-ghost'}>List</NavLink>
          <NavLink to="/employees/add" className={({isActive}) => isActive ? 'btn btn-primary' : 'btn btn-ghost'}>Add New</NavLink>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
