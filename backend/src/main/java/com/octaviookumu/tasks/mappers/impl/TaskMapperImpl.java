package com.octaviookumu.tasks.mappers.impl;

import com.octaviookumu.tasks.domain.dto.TaskDto;
import com.octaviookumu.tasks.domain.entities.Task;
import com.octaviookumu.tasks.mappers.TaskMapper;
import org.springframework.stereotype.Component;

@Component // marks as a bean, make it a candidate for injection
public class TaskMapperImpl implements TaskMapper {
    @Override
    public Task fromDto(TaskDto taskDto) {
        return new Task(
                taskDto.id(),
                taskDto.title(),
                taskDto.description(),
                taskDto.dueDate(),
                taskDto.status(),
                taskDto.priority(),
                null,
                null,
                null
        );
    }

    @Override
    public TaskDto toDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getPriority(),
                task.getStatus()
        );
    }
}
