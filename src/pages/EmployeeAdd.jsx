import React, { useState } from 'react'
import { loadData, saveData } from '../../utils/storage'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const initial = {name:'', role:'', department:'', salary:0, email:'', phone:''}

export default function EmployeeAdd(){
  const [form, setForm] = useState(initial)
  const navigate = useNavigate()

  function onChange(e){
    const {name, value} = e.target
    setForm(f => ({...f, [name]: value}))
  }

  function save(){
    if(!form.name) return alert('Name required')
    const data = loadData()
    const emp = {...form, id: uuidv4(), salary: Number(form.salary)}
    const newData = {...data, employees: [...data.employees, emp]}
    saveData(newData)
    navigate('/employees')
  }

  return (
    <div className="card">
      <h3>Add Employee</h3>
      <div className="form-row">
        <input className="input" name="name" placeholder="Full name" value={form.name} onChange={onChange} />
        <input className="input" name="role" placeholder="Role" value={form.role} onChange={onChange} />
      </div>
      <div className="form-row">
        <input className="input" name="department" placeholder="Department" value={form.department} onChange={onChange} />
        <input className="input" name="salary" type="number" placeholder="Salary" value={form.salary} onChange={onChange} />
      </div>
      <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
        <button className="btn btn-ghost" onClick={()=>navigate('/employees')}>Cancel</button>
        <button className="btn btn-primary" onClick={save}>Save</button>
      </div>
    </div>
  )
}
