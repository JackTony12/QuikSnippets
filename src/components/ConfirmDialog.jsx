import '../styles/dialog.css'

export default function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog" onClick={e => e.stopPropagation()} role="alertdialog">
        <div className="dialog__icon-row">
          <div className="dialog__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M5 4V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5V4M6 7v5M10 7v5M3 4l.8 9.2A1 1 0 004.8 14h6.4a1 1 0 001-.8L13 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="dialog__title">Borrar Snippet</p>
            <p className="dialog__sub">Esta acción no se puede deshacer</p>
          </div>
        </div>
        <p className="dialog__message">¿Estás seguro de que quieres eliminar permanentemente este snippet?</p>
        <div className="dialog__actions">
          <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm}>Borrar</button>
        </div>
      </div>
    </div>
  )
}
