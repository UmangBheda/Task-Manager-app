import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { getTaskById } from "../services/api";
import TaskForm from "../components/TaskForm";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editTask } = useTasks();
  const [task, setTask] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getTaskById(id).then((t) => {
      if (t) setTask(t);
      else setNotFound(true);
    });
  }, [id]);

  const handleSubmit = async (data) => {
    await editTask(id, data);
    navigate("/tasks");
  };

  if (notFound) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400">Task not found.</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 dark:text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Edit Task
      </h1>
      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
        submitLabel="Update Task"
      />
    </div>
  );
}
