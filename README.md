# CampusDesk — Student Management System

A polished, responsive student dashboard built for the DIWA2110 Web Application Development individual assignment. React + JavaScript for viewing, adding, editing, searching, filtering, and deleting student records — with a distinctive campus-inspired UI.

## Run locally

1. Install [Node.js](https://nodejs.org/) (version 18 or newer).
2. From this project directory, install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open the local URL printed by Vite (usually http://localhost:5173).

Create a production build with `npm run build`; preview it locally with `npm run preview`.

## Features

- Dashboard summary cards for total, enrolled, pending, and graduated students
- Search by student name, ID, email, or course, and filter by enrollment status
- Add and edit forms with required-name, age, optional email, course, and status validation
- Automatic student numbers in the `STU-2027-001` format
- Confirmation dialog before deleting a student
- Responsive layout with gradient sidebar (drawer on mobile)
- Empty state and toast feedback
- Automatic persistence in browser localStorage

## Publish

On Netlify or Vercel:

- Build command: `npm run build`
- Publish directory: `dist`
