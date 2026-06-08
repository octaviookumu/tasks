import { Button, Card, CardBody, Progress } from "@nextui-org/react";
import { List, Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTaskLists } from "../hooks/task-lists";

const TaskListScreen: React.FC = () => {
  const { data: taskLists = [], isLoading } = useTaskLists();

  // Get a handle on the router
  const navigate = useNavigate();

  const handleCreateTaskList = () => {
    navigate("/new-task-list");
  };

  const handleSelectTaskList = (taskListId: string | undefined) => {
    navigate(`/task-lists/${taskListId}`);
  };

  return (
    <div className="w-full max-w-sm p-4">
      <h1 className="mb-4 pr-2 text-2xl font-bold">My Task Lists</h1>
      <Button
        onPress={handleCreateTaskList}
        color="primary"
        startContent={<Plus size={20} aria-hidden="true" />}
        className="mb-4 w-full"
        aria-label="Create New Task List"
      >
        Create New Task List
      </Button>

      {/* Optional loading state */}

      {isLoading && (
        <p className="text-sm text-gray-500">Loading task lists...</p>
      )}

      {taskLists.map((list) => {
        return (
          <Card
            key={list.id}
            isPressable
            onPress={() => handleSelectTaskList(list.id)}
            className="mb-4 w-full"
            role="button"
            aria-label={`Select task list: ${list.title}`}
          >
            <CardBody>
              <div className="flex items-center">
                <List
                  size={20}
                  className="mr-2 opacity-[40%]"
                  aria-hidden="true"
                />
                <h2 className="text-lg font-semibold">{list.title}</h2>{" "}
              </div>
              <p className="mt-2 text-sm text-gray-500">{list.count} tasks</p>
              <Progress
                value={list.progress ? list.progress * 100 : 0}
                className="mt-2"
                color="primary"
                aria-label={`Progress for ${list.title}: ${list.progress}%`}
              />
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default TaskListScreen;
