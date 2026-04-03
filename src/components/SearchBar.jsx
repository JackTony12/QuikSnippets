import '../styles/searchbar.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar">
      <svg width="14" height="14" fill="none" className="searchbar__icon" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M9.5 9.5 13 13"/></svg>
      <input
        className="searchbar__input"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Buscar snippets…"
      />
      {value && (
        <button className="searchbar__clear" onClick={() => onChange('')} aria-label="Limpiar búsqueda">
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="m1 1 10 10m0-10L1 11"/></svg>
        </button>
      )}
    </div>
  )
}
