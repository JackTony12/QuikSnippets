import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import SnippetForm from './components/SnippetForm.jsx'
import SnippetList from './components/SnippetList.jsx'
import SearchBar from './components/SearchBar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Toast from './components/Toast.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import SnippetModal from './components/SnippetModal.jsx'
import { loadSnippets, saveSnippets } from './utils/storage.js'
import { LANGUAGES } from './utils/constants.js'
import './styles/layout.css'

const SAMPLE_SNIPPETS = [
]

export default function App() {
  const [snippets, setSnippets] = useState(() => {
    const saved = loadSnippets()
    return saved.length > 0 ? saved : SAMPLE_SNIPPETS
  })
  const [search, setSearch] = useState('')
  const [langFilter, setLangFilter] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [viewingSnippet, setViewingSnippet] = useState(null)

  // Persist to localStorage whenever snippets change
  useEffect(() => {
    saveSnippets(snippets)
  }, [snippets])

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
  }, [])

  const handleSave = useCallback((data) => {
    if (editing) {
      setSnippets(prev =>
        prev.map(s => s.id === editing.id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s)
      )
      showToast('Snippet updated successfully')
      setEditing(null)
    } else {
      const newSnippet = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      }
      setSnippets(prev => [newSnippet, ...prev])
      showToast('Snippet saved')
      setShowForm(false)
    }
  }, [editing, showToast])

  const handleEdit = useCallback((snippet) => {
    setEditing(snippet)
    setShowForm(false)
  }, [])

  const handleDelete = useCallback((id) => {
    setConfirmId(id)
  }, [])

  const confirmDelete = useCallback(() => {
    setSnippets(prev => prev.filter(s => s.id !== confirmId))
    setConfirmId(null)
    showToast('Snippet deleted', 'warn')
  }, [confirmId, showToast])

  const handleCopy = useCallback((snippet) => {
    navigator.clipboard.writeText(snippet.code)
      .then(() => {
        setCopiedId(snippet.id)
        showToast('Code copied to clipboard')
        setTimeout(() => setCopiedId(null), 2000)
      })
      .catch(() => showToast('Failed to copy to clipboard', 'error'))
  }, [showToast])

  const clearFilters = useCallback(() => {
    setSearch('')
    setLangFilter(null)
  }, [])

  const filtered = snippets.filter(s => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      (s.description || '').toLowerCase().includes(q)
    const matchLang = !langFilter || s.language === langFilter
    return matchSearch && matchLang
  })

  const langCounts = LANGUAGES.reduce((acc, lang) => {
    acc[lang] = snippets.filter(s => s.language === lang).length
    return acc
  }, {})

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar
        langCounts={langCounts}
        totalCount={snippets.length}
        activeFilter={langFilter}
        onFilterChange={setLangFilter}
      />

      {/* Main content */}
      <div className="main">
        {/* Header */}
        <header className="header">
          <SearchBar value={search} onChange={setSearch} />
          <button
            className="btn btn-primary"
            onClick={() => { setEditing(null); setShowForm(true) }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Nuevo Snippet
          </button>
        </header>

        {/* Snippet list */}
        <main className="content">
          <SnippetList
            snippets={filtered}
            hasFilters={!!(search || langFilter)}
            copiedId={copiedId}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onCopy={handleCopy}
            onClearFilters={clearFilters}
            onOpen={setViewingSnippet}
            onNew={() => setShowForm(true)}
          />
        </main>
      </div>

      {/* Modals */}
      {(showForm || editing) && (
        <SnippetForm
          initial={editing}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditing(null) }}
        />
      )}

      {confirmId && (
        <ConfirmDialog
          onConfirm={confirmDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {viewingSnippet && (
        <SnippetModal
          snippet={viewingSnippet}
          isCopied={copiedId === viewingSnippet.id}
          onClose={() => setViewingSnippet(null)}
          onEdit={handleEdit}
          onCopy={handleCopy}
        />
      )}
    </div>
  )
}
