import SnippetItem from './SnippetItem.jsx'
import { useState } from 'react'
import '../styles/list.css'

export default function SnippetList({
  snippets, hasFilters, copiedId,
  onDelete, onEdit, onCopy, onClearFilters, onNew, onOpen,
}) {

const [expandedIds, setExpandedIds] = useState(new Set())

const handleToggle = (id) => {
  setExpandedIds(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })
}

  if (snippets.length === 0) {
    return (
      <div className="list-empty">
        <div className="list-empty__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13.5 6l-3 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="list-empty__title">{hasFilters ? 'No hay snippets' : 'Sin snippets aún'}</p>
        <p className="list-empty__sub">
          {hasFilters ? 'Intenta ajustar tu búsqueda o filtros' : 'Crea tu primer snippet para tenerlo siempre a mano'}
        </p>
        {hasFilters ? (
          <button className="btn btn-secondary" onClick={onClearFilters}>Limpiar filtros</button>
        ) : (
          <button className="btn btn-primary" onClick={onNew}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Nuevo Snippet
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="list">
      <div className="list__meta">
        <span>{snippets.length} snippet{snippets.length !== 1 ? 's' : ''}{hasFilters && ' · filtrados'}</span>
        {hasFilters && (
          <button className="list__clear" onClick={onClearFilters}>
            <svg width="10" height="10" fill="none" viewBox="0 0 10 10"><path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="m1 1 8 8m0-8L1 9"/></svg>
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="list__grid">
        {snippets.map(snippet => (
          <SnippetItem
            key={snippet.id}
            snippet={snippet}
            isCopied={copiedId === snippet.id}
            onDelete={onDelete}
            isExpanded={expandedIds.has(snippet.id)}
            onToggleExpand={handleToggle}
            onEdit={onEdit}
            onCopy={onCopy}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  )
}
