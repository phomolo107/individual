import { getInitials, getNameFromEmail } from "../utils/students";

export default function StudentRow({ student, onEdit, onDelete }) {
  const name = student.name?.trim() || getNameFromEmail(student.email) || "Name not provided";
  const badgeClass =
    student.status === "Enrolled"
      ? "badge-enrolled"
      : student.status === "Pending"
        ? "badge-pending"
        : "badge-graduated";

  return (
    <tr>
      <td>
        <div className="student-cell">
          <div className="avatar" aria-hidden="true">
            {getInitials(name, student.email)}
          </div>
          <div>
            <div className="student-name">{name}</div>
            <div className="student-id">Student no. {student.id}</div>
          </div>
        </div>
      </td>
      <td>{student.email || "Not provided"}</td>
      <td>{student.age}</td>
      <td>{student.course}</td>
      <td>
        <span className={`badge ${badgeClass}`}>{student.status}</span>
      </td>
      <td>
        <div className="actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => onEdit(student)}
            aria-label={`Edit ${name}`}
            title="Edit"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            type="button"
            className="icon-btn danger"
            onClick={() => onDelete(student)}
            aria-label={`Delete ${name}`}
            title="Delete"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
