const STORAGE_KEY = "campusdesk-students";

export const STATUSES = ["Enrolled", "Pending", "Graduated"];

export const COURSES = [
  "Diploma in Business Information and Technology",
  "Diploma in Software Engineering",
  "Diploma in Graphic Design",
  "Diploma in Human Resource Management",
];

const STUDENT_NAMES_BY_ID = {
  "STU-2027-001": "Phomolo Mariti",
  "STU-2027-002": "Thabo Thabang",
  "STU-2027-003": "Thabiso Sera",
  "STU-2027-004": "Lerato Lerato",
  "STU-2027-005": "Thakholi Thakholi",
};

const STUDENT_EMAILS_BY_ID = {
  "STU-2027-001": "phomolomariti@campus.edu",
  "STU-2027-002": "thabothabang@campus.edu",
  "STU-2027-003": "thabisosera@campus.edu",
  "STU-2027-004": "leratolerato@campus.edu",
  "STU-2027-005": "thakholithakholi@campus.edu",
};

const STUDENT_COURSES_BY_ID = {
  "STU-2027-001": "Diploma in Business Information and Technology",
  "STU-2027-002": "Diploma in Software Engineering",
  "STU-2027-003": "Diploma in Graphic Design",
  "STU-2027-004": "Diploma in Human Resource Management",
  "STU-2027-005": "Diploma in Human Resource Management",
  "STU-2027-006": "Diploma in Business Information and Technology",
};

export const SAMPLE_STUDENTS = [
  {
    id: "STU-2027-001",
    name: STUDENT_NAMES_BY_ID["STU-2027-001"],
    email: STUDENT_EMAILS_BY_ID["STU-2027-001"],
    age: 21,
    course: STUDENT_COURSES_BY_ID["STU-2027-001"],
    status: "Enrolled",
  },
  {
    id: "STU-2027-002",
    name: STUDENT_NAMES_BY_ID["STU-2027-002"],
    email: STUDENT_EMAILS_BY_ID["STU-2027-002"],
    age: 23,
    course: STUDENT_COURSES_BY_ID["STU-2027-002"],
    status: "Enrolled",
  },
  {
    id: "STU-2027-003",
    name: STUDENT_NAMES_BY_ID["STU-2027-003"],
    email: STUDENT_EMAILS_BY_ID["STU-2027-003"],
    age: 20,
    course: STUDENT_COURSES_BY_ID["STU-2027-003"],
    status: "Pending",
  },
  {
    id: "STU-2027-004",
    name: STUDENT_NAMES_BY_ID["STU-2027-004"],
    email: STUDENT_EMAILS_BY_ID["STU-2027-004"],
    age: 24,
    course: STUDENT_COURSES_BY_ID["STU-2027-004"],
    status: "Graduated",
  },
  {
    id: "STU-2027-005",
    name: STUDENT_NAMES_BY_ID["STU-2027-005"],
    email: STUDENT_EMAILS_BY_ID["STU-2027-005"],
    age: 22,
    course: STUDENT_COURSES_BY_ID["STU-2027-005"],
    status: "Enrolled",
  },
  {
    id: "STU-2027-006",
    name: "Marcus Webb",
    email: "marcuswebb@campus.edu",
    age: 25,
    course: STUDENT_COURSES_BY_ID["STU-2027-006"],
    status: "Pending",
  },
];

export function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...SAMPLE_STUDENTS];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((student) => {
      const email = normalizeStudentEmail(student.email);
      return {
        ...student,
        name: STUDENT_NAMES_BY_ID[student.id] || student.name?.trim() || getNameFromEmail(student.email),
        email: STUDENT_EMAILS_BY_ID[student.id] || email,
        course: STUDENT_COURSES_BY_ID[student.id] || student.course,
      };
    }) : [...SAMPLE_STUDENTS];
  } catch {
    return [...SAMPLE_STUDENTS];
  }
}

export function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function normalizeStudentEmail(email = "") {
  const [localPart, ...domainParts] = String(email || "").trim().toLowerCase().split("@");
  if (domainParts.length === 0) return localPart.replace(/\./g, "");
  return `${localPart.replace(/\./g, "")}@${domainParts.join("@")}`;
}

export function createStudentId(students) {
  let highest = 0;
  for (const student of students) {
    const match = /^STU-2027-(\d+)$/.exec(String(student.id));
    const num = match ? Number(match[1]) : 0;
    if (num > highest) {
      highest = num;
    }
  }
  return `STU-2027-${String(highest + 1).padStart(3, "0")}`;
}

export function validateStudent(form) {
  const errors = {};

  if (!form.name || !form.name.trim()) {
    errors.name = "Full name is required.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (form.email && form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  const ageNum = Number(form.age);
  if (form.age === "" || form.age === null || form.age === undefined) {
    errors.age = "Age is required.";
  } else if (Number.isNaN(ageNum) || !Number.isInteger(ageNum)) {
    errors.age = "Age must be a whole number.";
  } else if (ageNum < 16 || ageNum > 100) {
    errors.age = "Age must be between 16 and 100.";
  }

  if (!form.course || !form.course.trim()) {
    errors.course = "Course is required.";
  }

  if (!form.status || !STATUSES.includes(form.status)) {
    errors.status = "Select a valid enrollment status.";
  }

  return errors;
}

export function getNameFromEmail(email = "") {
  const localPart = String(email || "").split("@")[0] || "";
  return localPart
    .split(/[._+-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function filterStudents(students, search, statusFilter) {
  const q = (search || "").trim().toLowerCase();

  return students.filter((s) => {
    const matchesStatus =
      !statusFilter || statusFilter === "All" || s.status === statusFilter;

    if (!matchesStatus) return false;
    if (!q) return true;

    return (
      (s.name || "").toLowerCase().includes(q) ||
      (s.id || "").toLowerCase().includes(q) ||
      (s.email || "").toLowerCase().includes(q) ||
      (s.course || "").toLowerCase().includes(q)
    );
  });
}

export function getInitials(name, email = "") {
  const displayName =
    name?.trim() ||
    String(email || "").split("@")[0].replace(/[._+-]+/g, " ").trim();
  if (!displayName) return "ST";
  const parts = displayName.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function countByStatus(students) {
  return students.reduce(
    (acc, s) => {
      acc.total += 1;
      if (s.status === "Enrolled") acc.enrolled += 1;
      else if (s.status === "Pending") acc.pending += 1;
      else if (s.status === "Graduated") acc.graduated += 1;
      return acc;
    },
    { total: 0, enrolled: 0, pending: 0, graduated: 0 }
  );
}
