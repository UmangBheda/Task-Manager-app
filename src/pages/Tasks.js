import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { FiSearch, FiPlusCircle } from "react-icons/fi";

export default function Tasks() {
  const { tasks, loading, removeTask, toggleComplete } = useTasks();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const matchSearch = t.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "All" || t.status === statusFilter;
      const matchPriority =
        priorityFilter === "All" || t.priority === priorityFilter;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      removeTask(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 dark:text-gray-500">Loading...</p>
      </div>
    );
  }

  const selectClass =
    "px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-colors";

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Tasks
        </h1>
        <Link
          to="/tasks/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <FiPlusCircle size={16} />
          New Task
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-colors"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClass}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className={selectClass}
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Task grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 dark:text-gray-500">
            {tasks.length === 0
              ? "No tasks yet. Create one to get started!"
              : "No tasks match your filters."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onToggle={toggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
