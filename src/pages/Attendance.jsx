import React, { useState, useEffect } from 'react'
import { loadData, saveData } from '../utils/storage'

export default function Attendance(){
  const [data, setData] = useState(loadData())
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [statusMap, setStatusMap] = useState({})

  useEffect(()=> saveData(data), [data])

  useEffect(()=>{
    const map = {}
    data.employees.forEach(e => {
      const key = `${date}_${e.id}`
      const rec = data.attendance.find(a => a.key===key)
      map[e.id] = rec ? rec.status : 'absent'
    })
    setStatusMap(map)
  }, [date, data])

  function mark(empId, status){
    const key = `${date}_${empId}`
    const existing = data.attendance.filter(a => a.key!==key)
    const newRec = {key, empId, date, status, updatedAt: Date.now()}
    setData(d => ({...d, attendance: [...existing, newRec]}))
  }

  return (
    <div>
      <h2>Attendance</h2>
      <div className="card header">
        <div>
          <label className="small">Select date</label><br/>
          <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
      </div>

      <div className="card">
        <h3>Mark Attendance for {date}</h3>
        <table className="table">
          <thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {data.employees.map(emp=>(
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{statusMap[emp.id]}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>mark(emp.id,'present')}>Present</button>
                  <button className="btn btn-ghost" onClick={()=>mark(emp.id,'absent')} style={{marginLeft:8}}>Absent</button>
                </td>
              </tr>
            ))}
            {data.employees.length===0 && <tr><td colSpan="4" className="small">No employees to mark.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
