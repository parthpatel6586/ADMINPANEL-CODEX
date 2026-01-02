// Simple auth utilities (frontend-only, localStorage)
// Demo user will be created automatically if no users exist.
// WARNING: NOT secure — demo only.

const AUTH_KEY = 'adminpanel_auth_v1'
const USERS_KEY = 'adminpanel_users_v1'

// Simple hash (not cryptographically secure) — only for demo so passwords are not stored plain.
function hash(s){ 
  let h = 0
  for(let i = 0; i < s.length; i++){
    h = (h << 5) - h + s.charCodeAt(i)
    h = h & h
  }
  return String(h)
}

export function ensureDefaultUser(){
  const raw = localStorage.getItem(USERS_KEY)
  if(!raw){
    const defaultUser = { id: 'user_admin', username: 'parth', passwordHash: hash('parth123'), role: 'admin', name: 'Administrator' }
    localStorage.setItem(USERS_KEY, JSON.stringify([defaultUser]))
  }
}

export function login(username, password){
  ensureDefaultUser()
  const raw = localStorage.getItem(USERS_KEY) || '[]'
  const users = JSON.parse(raw)
  const pw = hash(password)
  const user = users.find(u => u.username === username && u.passwordHash === pw)
  if(user){
    localStorage.setItem(AUTH_KEY, JSON.stringify({ userId: user.id, username: user.username, role: user.role, name: user.name }))
    return { ok: true, user }
  }
  return { ok: false, error: 'Invalid credentials' }
}

export function logout(){
  localStorage.removeItem(AUTH_KEY)
}

export function currentUser(){
  const raw = localStorage.getItem(AUTH_KEY)
  if(!raw) return null
  try { return JSON.parse(raw) } catch(e){ return null }
}

// Optional helper for protected code paths
export function requireAuth(){
  const u = currentUser()
  if(!u) throw new Error('not authenticated')
  return u
}

// Optional: register new users (admin UI could call this)
export function register(username, password, role='user', name=''){
  ensureDefaultUser()
  const raw = localStorage.getItem(USERS_KEY) || '[]'
  const users = JSON.parse(raw)
  if(users.find(u => u.username === username)) return { ok:false, error:'Username exists' }
  const id = 'user_' + Date.now()
  users.push({ id, username, passwordHash: hash(password), role, name })
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return { ok:true }
}
