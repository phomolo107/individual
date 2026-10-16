import { useEffect, useState } from "react";
import { COURSES, STATUSES, normalizeStudentEmail, validateStudent } from "../utils/students";

const EMPTY = {
  name: "",
  email: "",
  age: "",
  course: "",
  status: "Enrolled",
};

export default function StudentModal({ open, student, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const isEdit = Boolean(student);

  useEffect(() => {
    if (open) {
      if (student) {
        setForm({
          name: student.name,
          email: student.email,
          age: String(student.age),
          course: student.course,
          status: student.status,
        });
      } else {
        setForm(EMPTY);
      }
      setErrors({});
    }
  }, [open, student]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validateStudent(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      name: form.name.trim(),
      email: normalizeStudentEmail(form.email),
      age: Number(form.age),
      course: form.course.trim(),
      status: form.status,
    });
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3 id="student-modal-title">{isEdit ? "Edit student" : "Add student"}</h3>
            <p>{isEdit ? "Update the record below." : "Fill in the details to enrol a new student."}</p>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                  placeholder="e.g. Aisha Nkosi"
                  autoComplete="name"
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email (optional)</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  placeholder="student@campus.edu"
                  autoComplete="email"
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="16"
                    max="100"
                    value={form.age}
                    onChange={handleChange}
                    className={errors.age ? "error" : ""}
                    placeholder="18"
                  />
                  {errors.age && <span className="field-error">{errors.age}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={errors.status ? "error" : ""}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.status && <span className="field-error">{errors.status}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="course">Course</label>
                <select
                  id="course"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  className={errors.course ? "error" : ""}
                >
                  <option value="">Select a course</option>
                  {COURSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.course && <span className="field-error">{errors.course}</span>}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Save changes" : "Add student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
