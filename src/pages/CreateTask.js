import React from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

export default function CreateTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const handleSubmit = async (data) => {
    await addTask(data);
    navigate("/tasks");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Create Task
      </h1>
      <TaskForm onSubmit={handleSubmit} submitLabel="Create Task" />
    </div>
  );
}
