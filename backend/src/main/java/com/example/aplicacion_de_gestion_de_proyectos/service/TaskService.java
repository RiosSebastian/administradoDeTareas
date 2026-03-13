package com.example.aplicacion_de_gestion_de_proyectos.service;

import com.example.aplicacion_de_gestion_de_proyectos.dto.TaskRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.TaskResponse;

import java.util.List;

public interface TaskService {
    TaskResponse createTask(TaskRequest request);

    List<TaskResponse> getTasksByProject(Long projectId);

    TaskResponse updateTaskStatus(Long taskId, String status);

    void deleteById(Long id);
}
