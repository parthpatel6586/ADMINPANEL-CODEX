import React, { useState, useEffect } from 'react'
import { login, currentUser, ensureDefaultUser } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(()=> {
  
    ensureDefaultUser()
    const u = currentUser()
    if(u) navigate('/dashboard', { replace: true })
  }, [navigate])

  function submit(e){
    e.preventDefault()
    setError('')
    const res = login(username.trim(), password)
    if(res.ok){
      navigate('/dashboard', { replace: true })
    } else {
      setError(res.error || 'Login failed')
    }
  }

  return (
    <div style={{maxWidth:420, margin:'40px auto'}}>
      <div className="card">
        <h2>Login</h2>
        <p className="small"> <strong></strong>  <strong></strong></p>

        {error && <div style={{color:'var(--danger)', marginBottom:8}}>{error}</div>}

        <form onSubmit={submit}>
          <div className="form-row">
            <input className="input" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
          </div>
          <div className="form-row">
            <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>

          <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
            {/* <button className="btn btn-ghost" type="button" onClick={()=>{ setUsername('parth'); setPassword('parth123'); }}></button> */}
            <button className="btn btn-primary" type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )
}
