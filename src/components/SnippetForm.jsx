import { useState } from 'react'
import { LANGUAGES } from '../utils/constants.js'
import '../styles/form.css'

export default function SnippetForm({ initial, onSave, onClose }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [code, setCode] = useState(initial?.code || '')
  const [language, setLanguage] = useState(initial?.language || 'JavaScript')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = 'Title is required'
    if (!code.trim()) e.code = 'Code cannot be empty'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSave({ title: title.trim(), description: description.trim(), code: code.trim(), language })
    }
  }

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="form-modal__header">
          <div className="form-modal__title-row">
            <div className="form-modal__icon">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 5l-2 2.5L3 10M12 5l2 2.5L12 10M8.5 2.5l-2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="form-modal__title">{initial ? 'Editar Snippet' : 'Nuevo Snippet'}</h2>
          </div>
          <button className="form-modal__close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form className="form-modal__body" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="title">Título <span className="form-required">*</span></label>
            <input
              id="title"
              className={`form-input ${errors.title ? 'form-input--error' : ''}`}
              type="text"
              value={title}
              onChange={e => { setTitle(e.target.value); setErrors(p => ({ ...p, title: null })) }}
              placeholder="e.j. useDebounce hook"
            />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label" htmlFor="description">Descripción</label>
              <input
                id="description"
                className="form-input"
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Breve descripción..."
              />
            </div>

            <div className="form-field form-field--sm">
              <label className="form-label" htmlFor="language">Lenguaje</label>
              <select
                id="language"
                className="form-input form-select"
                value={language}
                onChange={e => setLanguage(e.target.value)}
              >
                {LANGUAGES.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="code">Código <span className="form-required">*</span></label>
            <textarea
              id="code"
              className={`form-input form-textarea ${errors.code ? 'form-input--error' : ''}`}
              value={code}
              onChange={e => { setCode(e.target.value); setErrors(p => ({ ...p, code: null })) }}
              placeholder="Pega o escribe tu código aquí..."
              rows={14}
              spellCheck={false}
            />
            {errors.code && <p className="form-error">{errors.code}</p>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 7l4 4 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {initial ? 'Guardar Cambios' : 'Crear Snippet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
