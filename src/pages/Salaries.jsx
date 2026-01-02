import React, { useState } from 'react'
import { loadData } from '../utils/storage'

export default function Salaries(){
  const { employees, attendance } = loadData()
  const [month, setMonth] = useState(new Date().toISOString().slice(0,7)) // YYYY-MM

  function computeSalary(emp){
    // Simple demo: salary * (presentDays / totalWorkingDays)
    const presentCount = attendance.filter(a => a.empId===emp.id && a.status==='present' && a.date.startsWith(month)).length
    const totalWorking = new Date(month.split('-')[0], Number(month.split('-')[1]), 0).getDate()
    if(totalWorking===0) return 0
    const base = Number(emp.salary) || 0
    return Math.round(base * (presentCount / totalWorking))
  }

  return (
    <div>
      <h2>Salaries</h2>
      <div className="card header">
        <div>
          <label className="small">Select month</label><br/>
          <input className="input" type="month" value={month} onChange={e=>setMonth(e.target.value)} />
        </div>
      </div>

      <div className="card">
        <h3>Salary calculations for {month}</h3>
        <table className="table">
          <thead><tr><th>Name</th><th>Base Salary</th><th>Computed</th></tr></thead>
          <tbody>
            {employees.map(emp=>(
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.salary}</td>
                <td>{computeSalary(emp)}</td>
              </tr>
            ))}
            {employees.length===0 && <tr><td colSpan="3" className="small">No employees.</td></tr>}
          </tbody>
        </table>
        <p className="small">Note: This is a frontend demo. Real payroll needs tax, deductions, allowances and legal checks.</p>
      </div>
    </div>
  )
}
