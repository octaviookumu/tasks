package com.octaviookumu.tasks.mappers.impl;

import com.octaviookumu.tasks.domain.dto.TaskListDto;
import com.octaviookumu.tasks.domain.entities.Task;
import com.octaviookumu.tasks.domain.entities.TaskList;
import com.octaviookumu.tasks.domain.entities.TaskStatus;
import com.octaviookumu.tasks.mappers.TaskListMapper;
import com.octaviookumu.tasks.mappers.TaskMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class TaskListMapperImpl implements TaskListMapper {

    private final TaskMapper taskMapper;

    public TaskListMapperImpl(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskList fromDto(TaskListDto taskListDto) {
        return new TaskList(
                taskListDto.id(),
                taskListDto.title(),
                taskListDto.description(),
                Optional.ofNullable(taskListDto.tasks()) // handle the case where we have a null
                        .map(tasks -> tasks.stream()
                                .map(taskMapper::fromDto)
                                .toList()
                        ).orElse(null),
                null,
                null

        );
    }

    @Override
    public TaskListDto toDto(TaskList taskList) {
        return new TaskListDto(
                taskList.getId(),
                taskList.getTitle(),
                taskList.getDescription(),
                Optional.ofNullable(taskList.getTasks()) // handle the case where we have a null
                        .map(List::size)
                        .orElse(0),
                calculateListProgress(taskList.getTasks()),
                Optional.ofNullable(taskList.getTasks())
                        .map(tasks -> tasks.stream() // if we do have a list of tasks
                                .map(taskMapper::toDto)
                                .toList()
                        ).orElse(null) // if we don't have list of tasks
        );
    }

    private Double calculateListProgress(List<Task> tasks) {
        if (tasks == null) {
            return null;
        }

        // count of closed tasks
        long countTaskCount = tasks.stream()
                .filter(task -> TaskStatus.CLOSED == task.getStatus())
                .count();

        return (double) countTaskCount / tasks.size();

    }
}
