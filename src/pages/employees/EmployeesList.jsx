import React, { useState, useEffect } from 'react'
import { loadData, saveData } from '../../utils/storage'
import { useNavigate } from 'react-router-dom'

export default function EmployeesList(){
  const [data, setData] = useState({employees: [], attendance: []})
  const navigate = useNavigate()

  useEffect(()=> {
    setData(loadData())
  }, [])

  useEffect(()=> {
    saveData(data)
  }, [data])

  function removeEmployee(id){
    if(!confirm('Remove employee?')) return
    setData(d => ({...d, employees: d.employees.filter(e => e.id !== id)}))
  }

  return (
    <div className="card">
      <h3>All Employees</h3>
      <table className="table">
        <thead><tr><th>Name</th><th>Role</th><th>Dept</th><th>Salary</th><th>Actions</th></tr></thead>
        <tbody>
          {data.employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>
                <button className="btn btn-ghost" onClick={()=>navigate(`/employees/edit/${emp.id}`)}>Edit</button>
                <button className="btn btn-danger" onClick={()=>removeEmployee(emp.id)} style={{marginLeft:8}}>Remove</button>
              </td>
            </tr>
          ))}
          {data.employees.length === 0 && (
            <tr><td colSpan="5" className="table-empty">No employees yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
