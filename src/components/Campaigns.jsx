import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Campaigns(){
  const [campaigns, setCampaigns] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const load = ()=> fetch(`${API}/api/campaigns`).then(r=>r.json()).then(setCampaigns)
  useEffect(()=>{load()},[])

  const create = async ()=>{
    if(!name || !message) return
    await fetch(`${API}/api/campaigns`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name, message, status:'draft'})})
    setName(''); setMessage(''); load()
  }

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Campaign name" className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white"/>
        <input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Message" className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white md:col-span-2"/>
        <button onClick={create} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Create</button>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {campaigns.map(c => (
          <div key={c.id} className="border border-white/10 rounded p-3 bg-white/5">
            <div className="text-white font-medium">{c.name}</div>
            <div className="text-sm text-blue-200/80">{c.message}</div>
            <div className="text-xs text-blue-300/70 mt-1">Status: {c.status}</div>
            <button className="mt-2 text-xs inline-flex items-center gap-1 text-blue-200 hover:text-white"><Play size={14}/> Simulate send</button>
          </div>
        ))}
      </div>
    </div>
  )
}
