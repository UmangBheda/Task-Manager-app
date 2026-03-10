import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiList,
  FiPlusCircle,
  FiX,
} from "react-icons/fi";

const links = [
  { to: "/", label: "Dashboard", icon: <FiGrid size={18} /> },
  { to: "/tasks", label: "Tasks", icon: <FiList size={18} /> },
  { to: "/tasks/new", label: "Create Task", icon: <FiPlusCircle size={18} /> },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-40
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shadow-none lg:z-auto
        `}
      >
        {/* Close button on mobile */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            Menu
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="mt-4 lg:mt-8 flex flex-col gap-1 px-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
