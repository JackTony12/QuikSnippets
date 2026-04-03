import { useEffect } from 'react'
import '../styles/toast.css'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`toast toast--${type}`} role="alert">
      <span className="toast__icon">
        {type === 'success' && (
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m1 7.5 4 4 8-9"/></svg>
        )}
        {type === 'warn' && (
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 1 1 12h12zm0 4v4m0 1.5v.5"/></svg>
        )}
        {type === 'error' && (
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" d="m1 1 12 12m0-12L1 13"/></svg>
        )}
      </span>
      {message}
    </div>
  )
}
