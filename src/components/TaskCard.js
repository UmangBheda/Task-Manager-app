import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiCircle,
  FiCalendar,
} from "react-icons/fi";

const priorityColors = {
  High: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  Medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  Low: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
};

function TaskCard({ task, onDelete, onToggle }) {
  const navigate = useNavigate();
  const isOverdue =
    task.status === "Pending" &&
    task.due_date &&
    new Date(task.due_date) < new Date(new Date().toDateString());

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border transition-all hover:shadow-md ${
        task.status === "Completed"
          ? "border-green-200 dark:border-green-800 opacity-80"
          : isOverdue
          ? "border-red-300 dark:border-red-700"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className={`font-semibold text-gray-800 dark:text-gray-100 ${
              task.status === "Completed" ? "line-through opacity-60" : ""
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
              priorityColors[task.priority] || priorityColors.Medium
            }`}
          >
            {task.priority}
          </span>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-3">
          {task.due_date && (
            <span
              className={`flex items-center gap-1 ${
                isOverdue ? "text-red-500 dark:text-red-400 font-medium" : ""
              }`}
            >
              <FiCalendar size={12} />
              {new Date(task.due_date).toLocaleDateString()}
              {isOverdue && " (Overdue)"}
            </span>
          )}
          <span
            className={`${
              task.status === "Completed"
                ? "text-green-500 dark:text-green-400"
                : "text-yellow-500 dark:text-yellow-400"
            }`}
          >
            {task.status}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => onToggle(task.id)}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
            title={
              task.status === "Completed"
                ? "Mark as Pending"
                : "Mark as Completed"
            }
          >
            {task.status === "Completed" ? (
              <FiCheckCircle size={14} className="text-green-500" />
            ) : (
              <FiCircle size={14} />
            )}
            {task.status === "Completed" ? "Undo" : "Complete"}
          </button>

          <button
            onClick={() => navigate(`/tasks/edit/${task.id}`)}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
            title="Edit task"
          >
            <FiEdit2 size={14} />
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors ml-auto"
            title="Delete task"
          >
            <FiTrash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TaskCard);
