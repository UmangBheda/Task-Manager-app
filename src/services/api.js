import { v4 as uuidv4 } from "uuid";

const TASKS_KEY = "taskmanager_tasks";
const USERS_KEY = "taskmanager_users";
const AUTH_KEY = "taskmanager_auth";

// --------------- Task helpers ---------------

function getAllTasks() {
  const raw = localStorage.getItem(TASKS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function getTasks() {
  return Promise.resolve(getAllTasks());
}

export function getTaskById(id) {
  const task = getAllTasks().find((t) => t.id === id);
  return Promise.resolve(task || null);
}

export function createTask({ title, description, priority, due_date }) {
  const tasks = getAllTasks();
  const newTask = {
    id: uuidv4(),
    title,
    description,
    priority: priority || "Medium",
    status: "Pending",
    due_date: due_date || "",
    created_at: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return Promise.resolve(newTask);
}

export function updateTask(id, updates) {
  const tasks = getAllTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return Promise.reject(new Error("Task not found"));
  tasks[idx] = { ...tasks[idx], ...updates };
  saveTasks(tasks);
  return Promise.resolve(tasks[idx]);
}

export function deleteTask(id) {
  const tasks = getAllTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
  return Promise.resolve(true);
}

// --------------- Auth helpers ---------------

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register(name, email, password) {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    return Promise.reject(new Error("Email already registered"));
  }
  const user = { id: uuidv4(), name, email, password };
  users.push(user);
  saveUsers(users);
  const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
  localStorage.setItem(AUTH_KEY, token);
  return Promise.resolve({ token, user: { id: user.id, name, email } });
}

export function login(email, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) return Promise.reject(new Error("Invalid credentials"));
  const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
  localStorage.setItem(AUTH_KEY, token);
  return Promise.resolve({
    token,
    user: { id: user.id, name: user.name, email },
  });
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  return Promise.resolve(true);
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_KEY);
}

export function getCurrentUser() {
  const token = getAuthToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}
