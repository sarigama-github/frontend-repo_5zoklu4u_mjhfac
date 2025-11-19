import { useEffect, useState } from 'react'
import { Send, Loader2, Sparkles } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function ChatWindow() {
  const [contacts, setContacts] = useState([])
  const [selected, setSelected] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/contacts`).then(r=>r.json()).then(setContacts).catch(()=>{})
  }, [])

  useEffect(() => {
    if (!selected) return
    fetch(`${API}/api/messages?contact_id=${selected.id}`).then(r=>r.json()).then(setMessages).catch(()=>{})
  }, [selected])

  const send = async () => {
    if (!input || !selected) return
    setLoading(true)
    await fetch(`${API}/api/messages`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({contact_id: selected.id, direction: 'outbound', text: input})})
    setInput('')
    const msgs = await fetch(`${API}/api/messages?contact_id=${selected.id}`).then(r=>r.json())
    setMessages(msgs)
    setLoading(false)
  }

  const suggest = async () => {
    if (!selected) return
    const history = messages.map(m => ({role: m.direction === 'inbound' ? 'user' : 'assistant', content: m.text}))
    const res = await fetch(`${API}/api/ai/suggest-reply`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({history})}).then(r=>r.json())
    setAiSuggestion(res.suggestion)
  }

  return (
    <div className="flex h-full">
      <div className="w-72 border-r border-white/10 p-3 space-y-2">
        <div className="text-xs text-blue-300/70 mb-2">Contacts</div>
        <button onClick={async ()=>{
          const name = prompt('Contact name')||'New Contact'
          const phone = prompt('Phone (ID)')||''
          const c = await fetch(`${API}/api/contacts`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name, phone, tags:[]})}).then(r=>r.json())
          const list = await fetch(`${API}/api/contacts`).then(r=>r.json())
          setContacts(list)
          const sel = list.find(x=>x.id===c.id)
          if (sel) setSelected(sel)
        }} className="w-full text-xs text-blue-200 hover:text-white">+ Add contact</button>
        <div className="space-y-1 overflow-auto max-h-[calc(100vh-220px)]">
          {contacts.map(c => (
            <button key={c.id} onClick={()=>setSelected(c)} className={`w-full px-3 py-2 rounded text-left text-sm ${selected?.id===c.id?'bg-blue-600/20 text-white':'hover:bg-white/5 text-blue-200'}`}>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-blue-300/70">{c.phone}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="text-white font-medium">{selected? selected.name : 'Select a contact'}</div>
          <button onClick={suggest} className="text-blue-300 hover:text-white flex items-center gap-1 text-sm"><Sparkles size={16}/> Suggest reply</button>
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {messages.map((m, i)=> (
            <div key={i} className={`max-w-md px-3 py-2 rounded-lg ${m.direction==='outbound' ? 'ml-auto bg-blue-600 text-white' : 'bg-white/10 text-blue-100'}`}>
              {m.text}
            </div>
          ))}
          {!messages.length && <div className="text-blue-300/70 text-sm">No messages yet.</div>}
        </div>
        <div className="p-3 border-t border-white/10 flex items-center gap-2">
          {aiSuggestion && (
            <button onClick={()=>setInput(aiSuggestion)} className="text-xs px-2 py-1 bg-blue-600/20 text-blue-200 rounded hover:bg-blue-600/30">Use suggestion</button>
          )}
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message" className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder:text-blue-300/60 outline-none"/>
          <button disabled={loading} onClick={send} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50 flex items-center gap-2">
            {loading? <Loader2 className="animate-spin" size={16}/> : <Send size={16}/>} Send
          </button>
        </div>
      </div>
    </div>
  )
}
