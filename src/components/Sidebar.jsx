export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${open ? "visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${open ? "open" : ""}`} aria-label="Main navigation">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            CD
          </div>
          <div className="brand-text">
            <h1>CampusDesk</h1>
            <p>Student hub</p>
          </div>
        </div>

        <nav>
          <p className="nav-label">Workspace</p>
          <a className="nav-item active" href="#students" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Students
          </a>
        </nav>

        <div className="sidebar-footer">
          <strong>Quick tip</strong>
          Search by name, ID, email or course. Filter by status to focus your list.
        </div>
      </aside>
    </>
  );
}
