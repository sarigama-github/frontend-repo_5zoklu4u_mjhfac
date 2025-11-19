import { useEffect, useState } from 'react'
const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Templates(){
  const [templates, setTemplates] = useState([])
  const [name, setName] = useState('')
  const [language, setLanguage] = useState('en')
  const [body, setBody] = useState('')

  const load = ()=> fetch(`${API}/api/templates`).then(r=>r.json()).then(setTemplates)
  useEffect(()=>{load()},[])

  const create = async ()=>{
    if(!name || !body) return
    const vars = Array.from(body.matchAll(/{{(.*?)}}/g)).map(m=>m[1])
    await fetch(`${API}/api/templates`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name, language, body, variables: vars})})
    setName(''); setBody(''); load()
  }

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Template name" className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white"/>
        <input value={language} onChange={e=>setLanguage(e.target.value)} placeholder="Language" className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white"/>
        <input value={body} onChange={e=>setBody(e.target.value)} placeholder="Body e.g. Hi {{name}}" className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white md:col-span-2"/>
        <button onClick={create} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Create</button>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {templates.map(t => (
          <div key={t.id} className="border border-white/10 rounded p-3 bg-white/5">
            <div className="text-white font-medium">{t.name} <span className="text-xs text-blue-300/70">({t.language})</span></div>
            <div className="text-sm text-blue-200/80">{t.body}</div>
            {!!t.variables?.length && <div className="text-xs text-blue-300/70 mt-1">Vars: {t.variables.join(', ')}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
