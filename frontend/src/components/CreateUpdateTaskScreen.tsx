import React, { useEffect, useState } from "react";
import { Button, Input, Textarea, Spacer, Card, Chip } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskPriority } from "../domain/TaskPriority";
import { DatePicker } from "@nextui-org/date-picker";
import { TaskStatus } from "../domain/TaskStatus";
import { parseDate } from "@internationalized/date";
import { useCreateTask, useTask, useUpdateTask } from "../hooks/tasks";

const CreateUpdateTaskScreen: React.FC = () => {
  const { listId, taskId } = useParams();

  const navigate = useNavigate();

  const isUpdate = !!taskId;

  // React Query data

  const { data: task, isLoading } = useTask(listId, taskId);

  const createTask = useCreateTask();

  const updateTask = useUpdateTask();

  const [error, setError] = useState("");

  // form state

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [dueDate, setDueDate] = useState<Date | undefined>();

  const [priority, setPriority] = useState(TaskPriority.MEDIUM);

  const [status, setStatus] = useState<TaskStatus | undefined>();

  // populate form once data arrives

  useEffect(() => {
    if (!task) return;

    setTitle(task.title);

    setDescription(task.description ?? "");

    setDueDate(task.dueDate ? new Date(task.dueDate) : undefined);

    setPriority(task.priority ?? TaskPriority.MEDIUM);

    setStatus(task.status);
  }, [task]);

  const handleSubmit = async () => {
    if (!listId) return;

    try {
      if (isUpdate && taskId) {
        await updateTask.mutateAsync({
          taskListId: listId,
          taskId,
          task: {
            id: taskId,
            title,
            description,
            dueDate,
            priority,
            status,
          },
        });
      } else {
        await createTask.mutateAsync({
          taskListId: listId,
          task: {
            title,
            description,
            dueDate,
            priority,
            status: TaskStatus.OPEN,
          },
        });
      }

      navigate(`/task-lists/${listId}`);
    } catch {
      setError("Something went wrong");
    }
  };

  const handleDateChange = (date: Date | null) => {
    setDueDate(date || undefined);
  };

  const formatDateForPicker = (date: Date | undefined) => {
    if (!date) return undefined;
    return date.toISOString().split("T")[0];
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <div className="mb-6 flex items-center space-x-4">
        <Button
          variant="ghost"
          aria-label="Go back"
          onPress={() => navigate(`/task-lists/${listId}`)}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">
          {isUpdate ? "Update Task" : "Create Task"}
        </h1>
      </div>
      {error && <Card className="mb-4 p-4 text-red-500">{error}</Card>}
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Title"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        <Spacer y={1} />
        <Textarea
          label="Description"
          placeholder="Enter task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <Spacer y={1} />
        <DatePicker
          label="Due date (optional)"
          defaultValue={
            dueDate ? parseDate(formatDateForPicker(dueDate)!) : undefined
          }
          onChange={(newDate) =>
            handleDateChange(newDate ? new Date(newDate.toString()) : null)
          }
        />
        <Spacer y={4} />
        <div className="mx-auto flex justify-between gap-2">
          {Object.values(TaskPriority).map((p) => (
            <Chip
              key={p}
              color={priority === p ? "primary" : "default"}
              variant={priority === p ? "solid" : "faded"}
              onClick={() => setPriority(p)}
              className="cursor-pointer"
            >
              {p} Priority
            </Chip>
          ))}
        </div>
        <Spacer y={4} />
        <Button type="submit" color="primary" onPress={handleSubmit} fullWidth>
          {isUpdate ? "Update Task" : "Create Task"}
        </Button>
      </form>
    </div>
  );
};

export default CreateUpdateTaskScreen;
