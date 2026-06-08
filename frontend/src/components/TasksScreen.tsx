import { parseDate } from "@internationalized/date";
import {
  Button,
  Checkbox,
  DateInput,
  Progress,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
} from "@nextui-org/react";
import { ArrowLeft, Edit, Minus, Plus, Trash } from "lucide-react";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Task from "../domain/Task";
import { TaskStatus } from "../domain/TaskStatus";
import { useTasks, useUpdateTask, useDeleteTask } from "../hooks/tasks";
import { useDeleteTaskList, useTaskList } from "../hooks/task-lists";

const TaskListScreen: React.FC = () => {
  const { listId } = useParams();
  const navigate = useNavigate();

  // Hooks FIRST (always)

  const { data: tasks = [], isLoading: loadingTasks } = useTasks(listId ?? "");
  const { data: taskList, isLoading: loadingList } = useTaskList(listId);
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const deleteTaskListMutation = useDeleteTaskList();

  const completionPercentage = useMemo(() => {
    if (!tasks.length) return 0;

    const closed = tasks.filter((t) => t.status === TaskStatus.CLOSED).length;

    return (closed / tasks.length) * 100;
  }, [tasks]);

  const toggleStatus = (task: Task) => {
    const updated = {
      ...task,

      status:
        task.status === TaskStatus.CLOSED ? TaskStatus.OPEN : TaskStatus.CLOSED,
    };

    updateTaskMutation.mutate({
      taskListId: listId!, // safe because hook enabled guards it
      taskId: task.id ?? "",
      task: updated,
    });
  };

  const deleteTaskList = () => {
    if (!listId) return;

    deleteTaskListMutation.mutate(listId, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    });
  };

  const deleteTask = (task: Task) => {
    if (!listId) return;

    deleteTaskMutation.mutate({
      taskListId: listId,
      taskId: task.id ?? "",
    });
  };

  // AFTER hooks + derived state

  if (!listId) return null;

  return (
    <div className="mx-auto max-w-4xl p-4">
      {/* Header */}

      {loadingList ? (
        <Spinner />
      ) : (
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onPress={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>

          {loadingList ? (
            <Spinner size="sm" label="Loading title..." />
          ) : (
            <h1 className="text-2xl font-bold">
              {taskList?.title ?? "Unknown Task List"}
            </h1>
          )}

          <Button
            variant="ghost"
            onPress={() => navigate(`/edit-task-list/${listId}`)}
            isDisabled={loadingList}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Progress */}

      <Progress value={completionPercentage} className="mb-4" />

      {/* Add Task */}

      <Button
        onPress={() => navigate(`/task-lists/${listId}/new-task`)}
        className="mb-4 w-full"
      >
        <Plus className="h-4 w-4" /> Add Task
      </Button>

      {/* Table */}

      <div className="overflow-hidden rounded-lg border">
        <Table aria-label="Tasks table">
          <TableHeader>
            <TableColumn>Completed</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Priority</TableColumn>
            <TableColumn>Due Date</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={!loadingTasks && "No tasks found."}
            loadingContent={<Spinner label="Loading tasks..." />}
            isLoading={loadingTasks}
          >
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    isSelected={task.status === TaskStatus.CLOSED}
                    onValueChange={() => toggleStatus(task)}
                  />
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  {task.dueDate && (
                    <DateInput
                      isDisabled
                      defaultValue={parseDate(
                        new Date(task.dueDate).toISOString().split("T")[0],
                      )}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      onPress={() =>
                        navigate(`/task-lists/${listId}/edit-task/${task.id}`)
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onPress={() => deleteTask(task)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Spacer y={4} />

      {/* Delete list */}

      <div className="flex justify-end">
        <Button
          color="danger"
          startContent={<Minus size={20} />}
          onPress={deleteTaskList}
        >
          Delete Task List
        </Button>
      </div>

      <Spacer y={4} />
    </div>
  );
};

export default TaskListScreen;
