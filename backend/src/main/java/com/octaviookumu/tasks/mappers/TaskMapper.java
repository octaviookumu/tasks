package com.octaviookumu.tasks.mappers;

import com.octaviookumu.tasks.domain.dto.TaskDto;
import com.octaviookumu.tasks.domain.entities.Task;

public interface TaskMapper {
    Task fromDto(TaskDto taskDto);
    TaskDto toDto(Task task);
}
