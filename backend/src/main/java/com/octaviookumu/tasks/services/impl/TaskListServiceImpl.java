package com.octaviookumu.tasks.services.impl;

import com.octaviookumu.tasks.domain.entities.TaskList;
import com.octaviookumu.tasks.repositories.TaskListRepository;
import com.octaviookumu.tasks.services.TaskListService;
import org.springframework.stereotype.Service;

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
}
