export default function DeleteModal({ open, student, onClose, onConfirm }) {
  if (!open || !student) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3 id="delete-modal-title">Remove student?</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="delete-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </div>
          <p>
            You are about to permanently remove{" "}
            <strong>{student.name}</strong> ({student.id}). This cannot be undone.
          </p>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Keep student
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
