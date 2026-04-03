import { useState, useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-json'
import { LANG_COLORS, PRISM_LANG_MAP } from '../utils/constants.js'
import '../styles/item.css'

function CodeBlock({ code, language }) {
  const codeRef = useRef(null)
  const prismLang = PRISM_LANG_MAP[language] || 'javascript'

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  return (
    <pre className="code-block">
      <code ref={codeRef} className={`language-${prismLang}`}>
        {code}
      </code>
    </pre>
  )
}

export default function SnippetItem({ snippet, isCopied, onDelete, onEdit, onCopy, onOpen, isExpanded, onToggleExpand }) {
  const color = LANG_COLORS[snippet.language] || '#888'

  const dateStr = new Date(snippet.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <article className="item">
      <div className="item__header">
        <div className="item__meta">
          <span
            className="item__lang-badge"
            style={{ color, background: `${color}18`, border: `1px solid ${color}28` }}
          >
            {snippet.language}
          </span>
          <span className="item__date">{dateStr}</span>
        </div>

        <div
          className="item__info item__info--clickable"
          onClick={() => onOpen(snippet)}
          title="Ver código completo"
        >
          <h3 className="item__title">{snippet.title}</h3>
          {snippet.description && (
            <p className="item__desc">{snippet.description}</p>
          )}
        </div>

        <div className="item__actions">
          <button
            className={`item__btn ${isCopied ? 'item__btn--copied' : ''}`}
            onClick={() => onCopy(snippet)}
            title="Copiar código"
          >
            {isCopied ? (
              <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m1 7 4 4 7-8"/></svg>
            ) : (
              <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><rect width="7" height="7" x="4.5" y="4.5" stroke="currentColor" strokeWidth="1.4" rx="1"/><path stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" d="M1 8.5V2a1 1 0 0 1 1-1h6.5"/></svg>
            )}
          </button>

          <button className="item__btn" onClick={() => onEdit(snippet)} title="Editar">
            <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" d="M9 1.5 11.5 4l-7 7L1 12l.5-3.5 7-7z"/></svg>
          </button>

          <button className="item__btn item__btn--danger" onClick={() => onDelete(snippet.id)} title="Eliminar">
            <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" d="M1.5 3.5h10m-7 0V2h4v1.5M5 6v4m3-4v4M2.5 3.5l.5 7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1l.5-7"/></svg>
          </button>

          <button
            className={`item__btn item__btn--expand ${isExpanded ? 'item__btn--expanded' : ''}`}
            onClick={() => onToggleExpand(snippet.id)}
            title={isExpanded ? 'Colapsar' : 'Expandir'}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m2.5 5 4 4 4-4"/></svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="item__code">
          <CodeBlock code={snippet.code} language={snippet.language} />
        </div>
      )}
    </article>
  )
}
