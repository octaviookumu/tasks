package com.octaviookumu.tasks.mappers;

import com.octaviookumu.tasks.domain.dto.TaskListDto;
import com.octaviookumu.tasks.domain.entities.TaskList;

public interface TaskListMapper {
    TaskList fromDto(TaskListDto taskListDto);

    TaskListDto toDto(TaskList taskList);
}
