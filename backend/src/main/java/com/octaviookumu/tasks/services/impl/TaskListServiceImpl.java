package com.octaviookumu.tasks.services.impl;

import com.octaviookumu.tasks.domain.entities.TaskList;
import com.octaviookumu.tasks.repositories.TaskListRepository;
import com.octaviookumu.tasks.services.TaskListService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskListServiceImpl implements TaskListService {

    private final TaskListRepository taskListRepository;

    public TaskListServiceImpl(TaskListRepository taskListRepository) {
        this.taskListRepository = taskListRepository;
    }

    @Override
    public List<TaskList> taskLists() {
        return taskListRepository.findAll();
    }

    @Override
    public TaskList createTaskList(TaskList taskList) {
        if (taskList.getId() != null) {
            throw new IllegalArgumentException("Task list already has an ID");
        }
        if (taskList.getTitle() == null || taskList.getTitle().isBlank()) {
            throw new IllegalArgumentException("Task list title must be present");
        }

        LocalDateTime now = LocalDateTime.now();
        // by creating a new task list instance rather than using the new input passed
        // into the method we ensure that no unexpected data gets persisted into the database
        TaskList createdTaskList = new TaskList(
                null,
                taskList.getTitle(),
                taskList.getDescription(),
                null,
                now,
                now
        );

        return taskListRepository.save(createdTaskList);
    }
}
