import React, { useState, useEffect } from "react";

const defaultValues = {
  title: "",
  description: "",
  priority: "Medium",
  due_date: "",
};

export default function TaskForm({ initialData, onSubmit, submitLabel }) {
  const [form, setForm] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "Medium",
        due_date: initialData.due_date
          ? initialData.due_date.slice(0, 10)
          : "",
      });
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className={`${inputClass} ${
            errors.title ? "border-red-400 focus:ring-red-400" : ""
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Enter task description"
          className={inputClass}
        />
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Priority
        </label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Due Date
        </label>
        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-sm"
      >
        {submitLabel || "Save Task"}
      </button>
    </form>
  );
}
