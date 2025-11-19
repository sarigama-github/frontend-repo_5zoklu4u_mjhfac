import { MessageSquare, Bot, Send, Workflow } from 'lucide-react'

export default function Topbar() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-blue-600 grid place-items-center text-white font-bold">Z</div>
        <div>
          <div className="text-white font-semibold leading-tight">Zapgen</div>
          <div className="text-xs text-blue-300/70">WhatsApp SaaS Platform</div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-blue-200">
        <div className="flex items-center gap-1 text-sm"><MessageSquare size={16}/> Chats</div>
        <div className="flex items-center gap-1 text-sm"><Send size={16}/> Campaigns</div>
        <div className="flex items-center gap-1 text-sm"><Workflow size={16}/> Flows</div>
        <div className="flex items-center gap-1 text-sm"><Bot size={16}/> AI</div>
      </div>
    </div>
  )
}
