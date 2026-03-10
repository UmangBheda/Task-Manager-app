# Task Manager Web Application (React) - Development Instructions

## Project Overview

Build a modern **Task Manager Web Application** using **React.js**.  
The application will help users manage daily tasks by creating, updating, deleting, and tracking task progress.

The UI should be clean, responsive, and easy to use.

---

# Technology Stack

Frontend:
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- TailwindCSS or Bootstrap

State Management:
- React Hooks (useState, useEffect)

Optional:
- Context API for global state

Backend (optional):
- Node.js + Express OR Django API

Database (optional):
- MongoDB / SQLite / Firebase

---

# Core Features

## 1. User Authentication (Optional)

Implement login and registration.

Features:

- Register user
- Login user
- Logout
- Store authentication token in localStorage
- Protect private routes

---

## 2. Task Management

Users must be able to:

- Create new tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- View all tasks

Task Fields:

- id
- title
- description
- priority (Low / Medium / High)
- status (Pending / Completed)
- due_date
- created_at

---

## 3. Dashboard

Main dashboard should show:

- Total tasks
- Completed tasks
- Pending tasks
- Overdue tasks

Include simple cards displaying statistics.

---

## 4. Pages / Components

Create these pages:

1. Login Page
2. Register Page
3. Dashboard Page
4. Task List Page
5. Create Task Page
6. Edit Task Page

Main Components:

- Navbar
- Sidebar
- TaskCard
- TaskForm
- TaskList
- DashboardStats

---

# UI Requirements

Design should be:

- Modern
- Responsive
- Minimal

Use:

- Flexbox / Grid
- Card layout
- Icons
- Smooth transitions

---

# Folder Structure

src/

components/
- Navbar.js
- Sidebar.js
- TaskCard.js
- TaskForm.js

pages/
- Dashboard.js
- Tasks.js
- CreateTask.js
- EditTask.js
- Login.js
- Register.js

context/
- TaskContext.js

services/
- api.js

App.js
index.js

---

# Task Operations

Implement CRUD operations.

Create Task

Edit Task

Delete Task

Mark Task Complete

Filter Tasks by:

- Completed
- Pending
- Priority

Search Tasks by title.

---

# Extra Features (Bonus)

Add if possible:

- Dark Mode
- Drag and Drop tasks
- Notifications
- Task Categories
- Calendar view
- Due date reminders

---

# State Management

Use:

- useState
- useEffect

Optional:

- Context API

State should handle:

- Task list
- Loading state
- Error state

---

# API Integration (Optional)

If backend exists:

GET /tasks  
POST /tasks  
PUT /tasks/:id  
DELETE /tasks/:id

Use fetch() or axios.

---

# Performance

Implement:

- Lazy loading
- Code splitting
- Memoization where needed

---

# Deployment

Prepare project for deployment.

Possible platforms:

- Vercel
- Netlify
- GitHub Pages

Include:

- README.md
- .env.example
- production build