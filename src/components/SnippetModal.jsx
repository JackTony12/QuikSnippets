import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import { LANG_COLORS, PRISM_LANG_MAP } from '../utils/constants.js'
import '../styles/modal.css'

export default function SnippetModal({ snippet, onClose, onEdit, onCopy, isCopied }) {
  const codeRef = useRef(null)
  const prismLang = PRISM_LANG_MAP[snippet.language] || 'javascript'
  const color = LANG_COLORS[snippet.language] || '#888'

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [snippet])

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const dateStr = new Date(snippet.createdAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="snip-modal-overlay" onClick={onClose}>
      <div className="snip-modal" onClick={e => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="snip-modal__header">
          <div className="snip-modal__header-left">
            <span
              className="snip-modal__lang-badge"
              style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}
            >
              {snippet.language}
            </span>
            <div>
              <h2 className="snip-modal__title">{snippet.title}</h2>
              {snippet.description && (
                <p className="snip-modal__desc">{snippet.description}</p>
              )}
            </div>
          </div>

          <div className="snip-modal__header-right">
            <span className="snip-modal__date">{dateStr}</span>

            {/* Copy */}
            <button
              className={`snip-modal__btn ${isCopied ? 'snip-modal__btn--copied' : ''}`}
              onClick={() => onCopy(snippet)}
              title="Copiar código"
            >
              {isCopied ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1 7l4 4 7-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Copiado!
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <rect x="4.5" y="4.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M1 8.5V2a1 1 0 011-1h6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  Copiar
                </>
              )}
            </button>

            {/* Edit */}
            <button
              className="snip-modal__btn"
              onClick={() => { onEdit(snippet); onClose() }}
              title="Editar snippet"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M9 1.5l2.5 2.5-7 7L1 12l.5-3.5 7-7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Editar
            </button>

            {/* Close */}
            <button className="snip-modal__close" onClick={onClose} title="Cerrar (Esc)">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1 1l13 13M14 1L1 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Code ── */}
        <div className="snip-modal__body">
          <pre className="snip-modal__pre">
            <code ref={codeRef} className={`language-${prismLang}`}>
              {snippet.code}
            </code>
          </pre>
        </div>

      </div>
    </div>
  )
}
