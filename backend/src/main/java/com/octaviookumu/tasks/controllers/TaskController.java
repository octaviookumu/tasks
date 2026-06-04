package com.octaviookumu.tasks.controllers;

import com.octaviookumu.tasks.domain.dto.TaskDto;
import com.octaviookumu.tasks.domain.entities.Task;
import com.octaviookumu.tasks.mappers.TaskMapper;
import com.octaviookumu.tasks.services.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/task-lists/{task_list_id}/tasks")
public class TaskController {

    private final TaskService taskService;
    private final TaskMapper taskMapper;

    public TaskController(TaskService taskService, TaskMapper taskMapper) {
        this.taskService = taskService;
        this.taskMapper = taskMapper;
    }

    @GetMapping
    public List<TaskDto> listTasks(@PathVariable("task_list_id") UUID taskListId) {
        return taskService.listTasks(taskListId)
                .stream()
                .map(taskMapper::toDto)
                .toList();
    }

    @PostMapping
    public TaskDto createTask(
            @PathVariable("task_list_id") UUID taskListId,
            @RequestBody TaskDto taskDto
    ) {
        Task taskToCreate = taskService.createTask(taskListId, taskMapper.fromDto(taskDto));
        return taskMapper.toDto(taskToCreate);

    }

}
