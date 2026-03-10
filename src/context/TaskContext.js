import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import * as api from "../services/api";

const TaskContext = createContext();

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

function taskReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_TASKS":
      return { ...state, tasks: action.payload, loading: false };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const tasks = await api.getTasks();
      dispatch({ type: "SET_TASKS", payload: tasks });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (taskData) => {
    try {
      const task = await api.createTask(taskData);
      dispatch({ type: "ADD_TASK", payload: task });
      return task;
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      throw err;
    }
  }, []);

  const editTask = useCallback(async (id, updates) => {
    try {
      const task = await api.updateTask(id, updates);
      dispatch({ type: "UPDATE_TASK", payload: task });
      return task;
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      throw err;
    }
  }, []);

  const removeTask = useCallback(async (id) => {
    try {
      await api.deleteTask(id);
      dispatch({ type: "DELETE_TASK", payload: id });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      throw err;
    }
  }, []);

  const toggleComplete = useCallback(
    async (id) => {
      const task = state.tasks.find((t) => t.id === id);
      if (!task) return;
      const newStatus =
        task.status === "Completed" ? "Pending" : "Completed";
      return editTask(id, { status: newStatus });
    },
    [state.tasks, editTask]
  );

  const value = useMemo(
    () => ({
      ...state,
      fetchTasks,
      addTask,
      editTask,
      removeTask,
      toggleComplete,
    }),
    [state, fetchTasks, addTask, editTask, removeTask, toggleComplete]
  );

  return (
    <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within a TaskProvider");
  return ctx;
}
