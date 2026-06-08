import TaskList from "../domain/TaskList";
import Task from "../domain/Task";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ?? "/api/v1";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const text = await res.text();

  return text ? (JSON.parse(text) as T) : (undefined as T);
}

export const getTaskLists = () => request<TaskList[]>("/task-lists");

export const getTaskList = (id: string) =>
  request<TaskList>(`/task-lists/${id}`);

export const createTaskList = (taskList: Omit<TaskList, "id">) =>
  request<TaskList>("/task-lists", {
    method: "POST",
    body: JSON.stringify(taskList),
  });

export const updateTaskList = (id: string, taskList: TaskList) =>
  request<TaskList>(`/task-lists/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskList),
  });

export const deleteTaskList = (id: string) =>
  request<void>(`/task-lists/${id}`, {
    method: "DELETE",
  });

export const getTasks = (taskListId: string): Promise<Task[]> =>
  request<Task[]>(`/task-lists/${taskListId}/tasks`);

export const getTask = (taskListId: string, taskId: string) =>
  request<Task>(`/task-lists/${taskListId}/tasks/${taskId}`);

export const createTask = (
  taskListId: string,
  task: Omit<Task, "id" | "taskListId">,
) =>
  request<Task>(`/task-lists/${taskListId}/tasks`, {
    method: "POST",
    body: JSON.stringify(task),
  });

export const updateTask = (taskListId: string, taskId: string, task: Task) =>
  request<Task>(`/task-lists/${taskListId}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });

export const deleteTask = (taskListId: string, taskId: string) =>
  request<void>(`/task-lists/${taskListId}/tasks/${taskId}`, {
    method: "DELETE",
  });
