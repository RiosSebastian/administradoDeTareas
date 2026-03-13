package com.example.aplicacion_de_gestion_de_proyectos.mapper;

import com.example.aplicacion_de_gestion_de_proyectos.dto.TaskRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.TaskResponse;
import com.example.aplicacion_de_gestion_de_proyectos.entity.Project;
import com.example.aplicacion_de_gestion_de_proyectos.entity.Task;
import com.example.aplicacion_de_gestion_de_proyectos.entity.User;

public class TaskMapper {

    public static Task toEntity(TaskRequest request, Project project, User user){

        return Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .project(project)
                .assignedUser(user)
                .build();
    }

    public static TaskResponse toResponse(Task task){

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .build();
    }

}