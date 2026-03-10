import React, { useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import {
  FiClipboard,
  FiCheckSquare,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4 transition-all hover:shadow-md">
      <div
        className={`p-3 rounded-lg ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {value}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { tasks, loading } = useTasks();

  const stats = useMemo(() => {
    const today = new Date(new Date().toDateString());
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const pending = tasks.filter((t) => t.status === "Pending").length;
    const overdue = tasks.filter(
      (t) =>
        t.status === "Pending" && t.due_date && new Date(t.due_date) < today
    ).length;
    return { total, completed, pending, overdue };
  }, [tasks]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 dark:text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FiClipboard size={22} className="text-indigo-600" />}
          label="Total Tasks"
          value={stats.total}
          color="bg-indigo-50 dark:bg-indigo-900/30"
        />
        <StatCard
          icon={<FiCheckSquare size={22} className="text-green-600" />}
          label="Completed"
          value={stats.completed}
          color="bg-green-50 dark:bg-green-900/30"
        />
        <StatCard
          icon={<FiClock size={22} className="text-yellow-600" />}
          label="Pending"
          value={stats.pending}
          color="bg-yellow-50 dark:bg-yellow-900/30"
        />
        <StatCard
          icon={<FiAlertTriangle size={22} className="text-red-600" />}
          label="Overdue"
          value={stats.overdue}
          color="bg-red-50 dark:bg-red-900/30"
        />
      </div>

      {tasks.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-400 dark:text-gray-500">
            No tasks yet. Create your first task to get started!
          </p>
        </div>
      )}
    </div>
  );
}
