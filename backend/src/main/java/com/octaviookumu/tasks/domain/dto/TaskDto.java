package com.octaviookumu.tasks.domain.dto;

import com.octaviookumu.tasks.domain.entities.TaskPriority;
import com.octaviookumu.tasks.domain.entities.TaskStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskDto(
        UUID id,
        String title,
        String description,
        LocalDateTime dueDate,
        TaskPriority priority,
        TaskStatus status
) {
}

// using record as it provides a concise way to create an immutable data class
// with all the boilerplate code needed
// using a record, java provides a constructor for all fields, getter, equals,
// hashcode methods and immutability
