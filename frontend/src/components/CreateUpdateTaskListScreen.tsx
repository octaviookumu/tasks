import React, { useEffect, useState } from "react";
import { Button, Input, Textarea, Spacer, Card } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateTaskList,
  useTaskList,
  useUpdateTaskList,
} from "../hooks/task-lists";
import TaskList from "../domain/TaskList";

const CreateUpdateTaskListScreen: React.FC = () => {
  const { listId } = useParams();

  const navigate = useNavigate();

  const isUpdate = !!listId;

  const { data: taskList, isLoading } = useTaskList(listId);

  const createTaskList = useCreateTaskList();

  const updateTaskList = useUpdateTaskList();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState<string | undefined>("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!taskList) return;

    setTitle(taskList.title);

    setDescription(taskList.description);
  }, [taskList]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isUpdate && listId) {
        const updated: TaskList = {
          id: listId,
          title,
          description,
          count: taskList?.count,
          progress: taskList?.progress,
          tasks: taskList?.tasks,
        };

        await updateTaskList.mutateAsync({ id: listId, taskList: updated });
      } else {
        const toCreate: Omit<TaskList, "id"> = {
          title,
          description,
          count: undefined,
          progress: undefined,
          tasks: undefined,
        };

        await createTaskList.mutateAsync(toCreate);
      }

      navigate("/");
    } catch {
      setError("Something went wrong");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <div className="mb-6 flex items-center space-x-4">
        <Button onPress={() => navigate("/")}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">
          {isUpdate ? "Update Task List" : "Create Task List"}
        </h1>
      </div>
      {error.length > 0 && <Card>{error}</Card>}
      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          placeholder="Enter task list title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        <Spacer y={1} />
        <Textarea
          label="Description"
          placeholder="Enter task list description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <Spacer y={1} />
        <Button type="submit" color="primary">
          {isUpdate ? "Update Task List" : "Create Task List"}
        </Button>
      </form>
    </div>
  );
};

export default CreateUpdateTaskListScreen;
