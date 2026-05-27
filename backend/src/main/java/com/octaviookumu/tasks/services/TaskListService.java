package com.octaviookumu.tasks.services;

import com.octaviookumu.tasks.domain.entities.TaskList;

import java.util.List;

public interface TaskListService {
    List<TaskList> taskLists();

    TaskList createTaskList(TaskList taskList);
}
