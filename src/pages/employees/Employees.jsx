import React, { useState, useEffect } from 'react'
import { loadData, saveData } from '../utils/storage'
import { v4 as uuidv4 } from 'uuid'

const initial = {name:'', role:'', department:'', salary:0, email:'', phone:''}

export default function Employees(){
  const [data, setData] = useState(loadData())
  const [form, setForm] = useState(initial)
  const [editingId, setEditingId] = useState(null)

  useEffect(()=> saveData(data), [data])

  function onChange(e){
    const {name, value} = e.target
    setForm(f => ({...f, [name]: value}))
  }

  function addEmployee(){
    if(!form.name) return alert('Name required')
    const emp = {...form, id: uuidv4(), salary: Number(form.salary)}
    setData(d => ({...d, employees: [...d.employees, emp]}))
    setForm(initial)
  }

  function editEmployee(emp){
    setEditingId(emp.id)
    setForm({...emp})
  }

  function updateEmployee(){
    setData(d => ({...d, employees: d.employees.map(e => e.id===editingId ? {...form, salary: Number(form.salary)} : e)}))
    setEditingId(null)
    setForm(initial)
  }

  function removeEmployee(id){
    if(!confirm('Remove employee?')) return
    setData(d => ({...d, employees: d.employees.filter(e => e.id!==id)}))
  }

  return (
    <div>
      <h2>Employees</h2>
      <div className="card">
        <div className="header">
          <div>{editingId ? 'Edit Employee' : 'Add New Employee'}</div>
        </div>
        <div className="form-row">
          <input className="input" name="name" placeholder="Full name" value={form.name} onChange={onChange} />
          <input className="input" name="role" placeholder="Role" value={form.role} onChange={onChange} />
        </div>
        <div className="form-row">
          <input className="input" name="department" placeholder="Department" value={form.department} onChange={onChange} />
          <input className="input" name="salary" placeholder="Salary (number)" type="number" value={form.salary} onChange={onChange} />
        </div>
        <div className="form-row">
          <input className="input" name="email" placeholder="Email" value={form.email} onChange={onChange} />
          <input className="input" name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
        </div>
        <div style={{marginTop:8}}>
          {editingId ? (
            <>
              <button className="btn btn-primary" onClick={updateEmployee}>Update</button>
              <button className="btn btn-ghost" onClick={()=>{setEditingId(null); setForm(initial)}} style={{marginLeft:8}}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
          )}
        </div>
      </div>

      <div className="card">
        <h3>All Employees</h3>
        <table className="table">
          <thead><tr><th>Name</th><th>Role</th><th>Dept</th><th>Salary</th><th>Contact</th><th>Actions</th></tr></thead>
          <tbody>
            {data.employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td><div className="small">{emp.email}<br/>{emp.phone}</div></td>
                <td>
                  <button className="btn btn-ghost" onClick={()=>editEmployee(emp)}>Edit</button>
                  <button className="btn" onClick={()=>removeEmployee(emp.id)} style={{marginLeft:6}}>Remove</button>
                </td>
              </tr>
            ))}
            {data.employees.length===0 && <tr><td colSpan="6" className="small">No employees yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
