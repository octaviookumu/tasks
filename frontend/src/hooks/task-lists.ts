import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/tasks";

export const useTaskLists = () =>
  useQuery({
    queryKey: ["taskLists"],
    queryFn: api.getTaskLists,
  });

export const useCreateTaskList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createTaskList,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["taskLists"],
      });
    },
  });
};

export const useTaskList = (id?: string) =>
  useQuery({
    queryKey: ["taskList", id],
    queryFn: () => api.getTaskList(id!),
    enabled: !!id,
  });

export const useUpdateTaskList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      taskList,
    }: {
      id: string;
      taskList: Parameters<typeof api.updateTaskList>[1];
    }) => api.updateTaskList(id, taskList),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["taskLists"], // refresh all task lists
      });

      queryClient.invalidateQueries({
        queryKey: ["taskList", variables.id], // refresh one specific task list.
      });
    },
  });
};

export const useDeleteTaskList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteTaskList,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["taskLists"],
      });
    },
  });
};
