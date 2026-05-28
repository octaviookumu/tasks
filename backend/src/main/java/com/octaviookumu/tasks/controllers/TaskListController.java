package com.octaviookumu.tasks.controllers;

import com.octaviookumu.tasks.domain.dto.TaskListDto;
import com.octaviookumu.tasks.domain.entities.TaskList;
import com.octaviookumu.tasks.mappers.TaskListMapper;
import com.octaviookumu.tasks.services.TaskListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/task-lists")
public class TaskListController {

    private final TaskListService taskListService;
    private final TaskListMapper taskListMapper;

    public TaskListController(TaskListService taskListService, TaskListMapper taskListMapper) {
        this.taskListService = taskListService;
        this.taskListMapper = taskListMapper;
    }

    @GetMapping
    public List<TaskListDto> getTaskLists() {
        return taskListService.taskLists().stream()
                .map(taskListMapper::toDto)
                .toList();
    }

    @PostMapping
    public TaskListDto createTaskList(@RequestBody TaskListDto taskListDto) {
        TaskList taskList = taskListService.createTaskList(
                taskListMapper.fromDto(taskListDto)
        );
        return taskListMapper.toDto(taskList);
    }

    @GetMapping("/{task_list_id}")
    public Optional<TaskListDto> getTaskList(@PathVariable("task_list_id") UUID taskListId) {
        return taskListService.getTaskList(taskListId)
                .map(taskListMapper::toDto);
    }

    @PutMapping("/{task_list_id}")
    public TaskListDto updateTaskList(
            @PathVariable("task_list_id") UUID taskListId,
            @RequestBody TaskListDto taskListDto) {

        TaskList updatedTaskList = taskListService.updateTaskList(
                taskListId, taskListMapper.fromDto(taskListDto)
        );

        return taskListMapper.toDto(updatedTaskList);

    }

}
