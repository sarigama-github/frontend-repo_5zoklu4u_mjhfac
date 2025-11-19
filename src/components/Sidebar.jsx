import { Users, Tag, FileText, Rocket } from 'lucide-react'

export default function Sidebar({ onSectionChange, section }) {
  const items = [
    { key: 'chats', label: 'Chats', icon: Users },
    { key: 'campaigns', label: 'Campaigns', icon: Rocket },
    { key: 'templates', label: 'Templates', icon: FileText },
    { key: 'contacts', label: 'Contacts', icon: Tag },
  ]

  return (
    <div className="w-60 border-r border-white/10 p-4 bg-slate-900/40 backdrop-blur">
      <div className="text-blue-300/70 text-xs mb-3">Sections</div>
      <div className="space-y-1">
        {items.map(Item => (
          <button
            key={Item.key}
            onClick={() => onSectionChange(Item.key)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left transition-colors ${section===Item.key? 'bg-blue-600/20 text-white' : 'text-blue-200 hover:bg-white/5'}`}
          >
            <Item.icon size={16}/>
            <span className="text-sm">{Item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
