import { useState } from 'react'
import { Plus, Link2 } from 'lucide-react'

export default function FlowBuilder(){
  const [nodes, setNodes] = useState([{ id: 'start', label: 'Start', x: 40, y: 40 }])
  const [edges, setEdges] = useState([])

  const addNode = () => {
    const id = `n${nodes.length+1}`
    setNodes([...nodes, { id, label: `Step ${nodes.length}`, x: 60 + nodes.length*40, y: 120 }])
  }

  const link = () => {
    if(nodes.length < 2) return
    setEdges([...edges, { from: nodes[nodes.length-2].id, to: nodes[nodes.length-1].id }])
  }

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-3">
        <button onClick={addNode} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 inline-flex items-center gap-1"><Plus size={16}/> Add step</button>
        <button onClick={link} className="px-3 py-2 bg-white/10 text-blue-100 rounded hover:bg-white/20 inline-flex items-center gap-1"><Link2 size={16}/> Link last two</button>
      </div>
      <div className="relative border border-white/10 rounded h-96 bg-slate-900/40">
        {nodes.map(n => (
          <div key={n.id} className="absolute px-3 py-2 rounded bg-white/10 text-white" style={{left:n.x, top:n.y}}>{n.label}</div>
        ))}
        {edges.map((e,i)=> (
          <div key={i} className="absolute text-xs text-blue-300/70" style={{left: 100 + i*20, top: 80 + i*10}}>→ {e.from} to {e.to}</div>
        ))}
      </div>
    </div>
  )
}
