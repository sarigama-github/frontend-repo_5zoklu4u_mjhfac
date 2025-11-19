import { useState } from 'react'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import Campaigns from './components/Campaigns'
import Templates from './components/Templates'
import FlowBuilder from './components/FlowBuilder'

function App() {
  const [section, setSection] = useState('chats')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <Topbar />
      <div className="flex" style={{height:'calc(100vh - 64px)'}}>
        <Sidebar section={section} onSectionChange={setSection} />
        <div className="flex-1">
          {section==='chats' && <ChatWindow />}
          {section==='campaigns' && <Campaigns />}
          {section==='templates' && <Templates />}
          {section==='contacts' && (
            <div className="p-6 text-blue-200">Use the Chats panel to add contacts. A dedicated contacts manager can be added next.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
