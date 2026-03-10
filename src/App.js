import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAuthToken } from "./services/api";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Lazy-loaded pages for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Tasks = lazy(() => import("./pages/Tasks"));
const CreateTask = lazy(() => import("./pages/CreateTask"));
const EditTask = lazy(() => import("./pages/EditTask"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function PrivateRoute({ children }) {
  return getAuthToken() ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  return getAuthToken() ? <Navigate to="/" replace /> : children;
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400 dark:text-gray-500">Loading...</p>
    </div>
  );
}

function AppLayout({ darkMode, setDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <TaskProvider>
      <div className="flex flex-col h-screen">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 transition-colors">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/new" element={<CreateTask />} />
                <Route path="/tasks/edit/:id" element={<EditTask />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </TaskProvider>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("taskmanager_dark") === "true";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("taskmanager_dark", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <AppLayout darkMode={darkMode} setDarkMode={setDarkMode} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
