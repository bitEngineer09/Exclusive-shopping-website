import React from 'react'

const CommandItem = ({command, description}) => {
  return (
    <div className="flex items-start gap-3 border-b border-gray-200 pb-2 last:border-0 last:pb-0">
        <span className="text-rose-600 font-mono text-sm font-semibold mt-0.5">"{command}"</span>
        <span className="text-gray-600 text-sm flex-1">→ {description}</span>
    </div>
  )
}

export default CommandItem