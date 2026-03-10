import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSun, FiMoon, FiLogOut, FiMenu } from "react-icons/fi";
import { logout, getAuthToken } from "../services/api";

export default function Navbar({ darkMode, setDarkMode, onToggleSidebar }) {
  const navigate = useNavigate();
  const isAuth = !!getAuthToken();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={22} />
        </button>
        <Link
          to="/"
          className="text-xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight"
        >
          TaskManager
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {isAuth && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <FiLogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
}
