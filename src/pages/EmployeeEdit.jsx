import React, { useState, useEffect } from 'react'
import { loadData, saveData } from '../../utils/storage'
import { useNavigate, useParams } from 'react-router-dom'

export default function EmployeeEdit(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)

  useEffect(()=>{
    const data = loadData()
    const emp = data.employees.find(e => e.id === id)
    if(!emp) {
      alert('Employee not found')
      navigate('/employees')
      return
    }
    setForm({...emp})
  }, [id, navigate])

  function onChange(e){
    const {name, value} = e.target
    setForm(f => ({...f, [name]: value}))
  }

  function save(){
    const data = loadData()
    const newData = {...data, employees: data.employees.map(e => e.id === id ? {...form, salary: Number(form.salary)} : e)}
    saveData(newData)
    navigate('/employees')
  }

  if(!form) return null
  return (
    <div className="card">
      <h3>Edit Employee</h3>
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
