import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/tasks";

export const useTasks = (taskListId?: string) =>
  useQuery({
    queryKey: ["tasks", taskListId],
    queryFn: () => api.getTasks(taskListId!),
    enabled: !!taskListId,
  });

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskListId,
      task,
    }: {
      taskListId: string;
      task: Parameters<typeof api.createTask>[1];
    }) => api.createTask(taskListId, task),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.taskListId],
      });
    },
  });
};

export const useTask = (taskListId?: string, taskId?: string) =>
  useQuery({
    queryKey: ["task", taskListId, taskId],
    queryFn: () => api.getTask(taskListId!, taskId!),
    enabled: !!taskListId && !!taskId,
  });

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskListId,
      taskId,
      task,
    }: {
      taskListId: string;
      taskId: string;
      task: Parameters<typeof api.updateTask>[2];
    }) => api.updateTask(taskListId, taskId, task),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.taskListId],
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskListId,
      taskId,
    }: {
      taskListId: string;
      taskId: string;
    }) => api.deleteTask(taskListId, taskId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.taskListId],
      });
    },
  });
};
