const STORAGE_KEY = 'snippet_manager_v1'

export function loadSnippets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('Failed to load snippets:', err)
    return []
  }
}

export function saveSnippets(snippets) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets))
  } catch (err) {
    console.error('Failed to save snippets:', err)
  }
}
