import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import StudentRow from "./components/StudentRow";
import StudentModal from "./components/StudentModal";
import DeleteModal from "./components/DeleteModal";
import {
  loadStudents,
  saveStudents,
  createStudentId,
  filterStudents,
  countByStatus,
} from "./utils/students";

export default function App() {
  const [students, setStudents] = useState(() => loadStudents());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(
    () => filterStudents(students, search, statusFilter),
    [students, search, statusFilter]
  );

  const stats = useMemo(() => countByStatus(students), [students]);

  function showToast(message) {
    setToast(message);
  }

  function handleAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function handleEdit(student) {
    setEditing(student);
    setModalOpen(true);
  }

  function handleSave(data) {
    if (editing) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editing.id ? { ...s, ...data } : s))
      );
      showToast(`Updated ${data.name}`);
    } else {
      const id = createStudentId(students);
      setStudents((prev) => [...prev, { id, ...data }]);
      showToast(`Added ${data.name}`);
    }
    setModalOpen(false);
    setEditing(null);
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    showToast(`Removed ${deleteTarget.name}`);
    setDeleteTarget(null);
  }

  return (
    <div className="app-shell">
      <div className="mobile-header">
        <div className="brand">
          <div className="brand-mark">CD</div>
          <div className="brand-text">
            <h1>CampusDesk</h1>
          </div>
        </div>
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main">
        <header className="page-header">
          <div>
            <span className="eyebrow">STUDENT MANAGEMENT</span>
            <h2>CampusDesk</h2>
            <p>Students, stories, and next steps — all in one place.</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add student
          </button>
        </header>

        <section className="welcome-card" aria-label="Campus community">
          <div className="welcome-copy">
            <span className="welcome-kicker">A COMMUNITY IN THE MAKING</span>
            <h3>A place for every<br />kind of bright.</h3>
            <p>Big ideas, new beginnings, and the people who make it all happen.</p>
            <span className="welcome-note">
              <span aria-hidden="true">✳</span> Here’s to growing together
            </span>
          </div>
          <div className="welcome-art" aria-hidden="true">
            <span className="art-sun" />
            <span className="art-spark spark-one">✳</span>
            <span className="art-spark spark-two">✦</span>
            <svg className="campus-doodle" viewBox="0 0 300 190" fill="none">
              <path d="M35 157h225M53 157V84l45-30 45 30v73M75 157v-37h45v37M153 157V67h74v90M143 68l47-29 47 29M170 89h12m18 0h12m-42 24h12m18 0h12m-42 24h12m18 0h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M40 164c34-10 50 8 85 0s55 8 83 0 43 3 54 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M229 40c8-11 19-11 26 0m-13-13v26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="art-orbit orbit-one" />
            <span className="art-orbit orbit-two" />
            <span className="art-note">GOOD THINGS<br />GROW HERE</span>
            <span className="art-sticker">CLASS<br />OF '26 <span>✳</span></span>
            <div className="art-people">
              <span className="art-person person-one">AN</span>
              <span className="art-person person-two">LC</span>
              <span className="art-person person-three">SM</span>
              <span className="art-person person-four">JB</span>
            </div>
            <span className="art-stem stem-one" />
            <span className="art-stem stem-two" />
          </div>
        </section>

        <div className="section-heading">
          <div>
            <span className="eyebrow">THE BIG PICTURE</span>
            <h3>Campus at a glance</h3>
          </div>
          <span className="section-note"><span /> All caught up</span>
        </div>

        <section className="stats-grid" aria-label="Summary statistics">
          <StatCard label="Total students" value={stats.total} variant="total">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </StatCard>
          <StatCard label="Enrolled" value={stats.enrolled} variant="enrolled">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </StatCard>
          <StatCard label="Pending" value={stats.pending} variant="pending">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </StatCard>
          <StatCard label="Graduated" value={stats.graduated} variant="graduated">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </StatCard>
        </section>

        <div className="toolbar">
          <div className="search-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="Search by name, ID, email or course…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search students"
            />
          </div>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Pending">Pending</option>
            <option value="Graduated">Graduated</option>
          </select>
        </div>

        <div className="table-card">
          <div className="directory-heading">
            <div>
              <span className="eyebrow">YOUR PEOPLE</span>
              <h3>Student directory</h3>
              <p>A home for every name, story, and next step.</p>
            </div>
            <span className="record-count">
              <strong>{filtered.length.toString().padStart(2, "0")}</strong>
              <span>{filtered.length === 1 ? "student" : "students"}</span>
            </span>
          </div>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-illustration" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>
                {students.length === 0 ? "No students yet" : "No matches found"}
              </h3>
              <p>
                {students.length === 0
                  ? "Add your first student to get the dashboard rolling."
                  : "Try a different search or clear the status filter."}
              </p>
              {students.length === 0 && (
                <button type="button" className="btn btn-primary" onClick={handleAdd}>
                  Add student
                </button>
              )}
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Student name / number</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((student) => (
                    <StudentRow
                      key={student.id}
                      student={student}
                      onEdit={handleEdit}
                      onDelete={setDeleteTarget}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <StudentModal
        open={modalOpen}
        student={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />

      <DeleteModal
        open={Boolean(deleteTarget)}
        student={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

      {toast && (
        <div className="toast" role="status">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {toast}
        </div>
      )}
    </div>
  );
}
