const KEY = 'adminpanel_employees_v1'

export function loadData(){
  try{
    const raw = localStorage.getItem(KEY)
    if(!raw) return {employees: [], attendance: []}
    return JSON.parse(raw)
  }catch(e){
    console.error(e)
    return {employees: [], attendance: []}
  }
}

export function saveData(data){
  localStorage.setItem(KEY, JSON.stringify(data))
}
