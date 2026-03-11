<<<<<<< HEAD
# Task Manager

A modern, responsive Task Manager web application built with React.js and TailwindCSS.

## Features

- **Task CRUD** — Create, read, update, and delete tasks
- **Dashboard** — View statistics: total, completed, pending, and overdue tasks
- **Search & Filter** — Filter tasks by status, priority, or search by title
- **Authentication** — Register and login with protected routes (localStorage-based)
- **Dark Mode** — Toggle between light and dark themes
- **Responsive** — Mobile-first design with collapsible sidebar
- **Performance** — Lazy-loaded pages, memoized components

## Tech Stack

- React 19 with Hooks & Context API
- React Router v7
- TailwindCSS v3
- React Icons
- localStorage for persistence

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone <repo-url>
cd task-manager
npm install
```

### Development

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

The optimized output is in the `build/` folder, ready for deployment to Vercel, Netlify, or GitHub Pages.

## Project Structure

```
src/
  components/   — Navbar, Sidebar, TaskCard, TaskForm
  pages/        — Dashboard, Tasks, CreateTask, EditTask, Login, Register
  context/      — TaskContext (global state via Context API)
  services/     — api.js (localStorage CRUD helpers)
  App.js        — Routing, auth guard, dark mode
  index.js      — Entry point
```

## Environment Variables

Copy `.env.example` to `.env` and configure as needed:

```bash
cp .env.example .env
```

## Deployment

This project is ready to deploy on:

- **Vercel** — `npm run build` then deploy the `build/` folder
- **Netlify** — Set build command to `npm run build` and publish directory to `build`
- **GitHub Pages** — Add `"homepage"` to package.json and use `gh-pages`
=======
# Task-Manager-app
>>>>>>> 91627156f0a34170f64f2da81638d1a68cdfe891
