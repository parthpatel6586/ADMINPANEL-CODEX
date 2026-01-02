import React from 'react'
import { loadData } from '../utils/storage'

export default function Dashboard(){
  const { employees, attendance } = loadData()
  const total = employees.length
  const presentCount = attendance.filter(a => a.status === 'present').length
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="card header">
        <div>
          <h3>Total Employees</h3>
          <div style={{fontSize:24}}>{total}</div>
        </div>
        <div>
          <h3>Attendance Records</h3>
          <div style={{fontSize:24}}>{attendance.length} (Present: {presentCount})</div>
        </div>
      </div>
      <div className="card">
        <h3>Quick Actions</h3>
        <p className="small">Use the Employees page to add, edit and remove employees. Attendance and Salaries are computed from stored data.</p>
      </div>
    </div>
  )
}
