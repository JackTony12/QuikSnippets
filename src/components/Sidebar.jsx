import { LANGUAGES, LANG_COLORS } from '../utils/constants.js'
import '../styles/sidebar.css'
export default function Sidebar({ langCounts, totalCount, activeFilter, onFilterChange }) {
  const usedLangs = LANGUAGES.filter(l => langCounts[l] > 0)

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <img src="/QuikSnippetsIcon.png" alt="logo" />
        </div>
        <div>
          <p className="sidebar__app-name">QuikSnippets</p>
          <p className="sidebar__app-sub">Gestor de código</p>
        </div>
      </div>

      {/* Filters */}
      <nav className="sidebar__nav">
        <p className="sidebar__section-label">Lenguajes</p>

        <button
          className={`sidebar__item ${!activeFilter ? 'sidebar__item--active' : ''}`}
          onClick={() => onFilterChange(null)}
        >
          <span className="sidebar__item-left">
            <span className="sidebar__dot sidebar__dot--all" />
            Todos los snippets
          </span>
          <span className="sidebar__count">{totalCount}</span>
        </button>

        {usedLangs.map(lang => (
          <button
            key={lang}
            className={`sidebar__item ${activeFilter === lang ? 'sidebar__item--active' : ''}`}
            onClick={() => onFilterChange(activeFilter === lang ? null : lang)}
          >
            <span className="sidebar__item-left">
              <span
                className="sidebar__dot"
                style={{ background: activeFilter === lang ? LANG_COLORS[lang] : '#2a2a2a' }}
              />
              {lang}
            </span>
            <span className="sidebar__count">{langCounts[lang]}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <p>{totalCount} snippet{totalCount !== 1 ? 's' : ''} guardado{totalCount !== 1 ? 's' : ''}</p>
      </div>
    </aside>
  )
}
