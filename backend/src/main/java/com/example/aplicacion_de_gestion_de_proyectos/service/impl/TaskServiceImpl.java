package com.example.aplicacion_de_gestion_de_proyectos.service.impl;

import com.example.aplicacion_de_gestion_de_proyectos.dto.TaskRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.TaskResponse;
import com.example.aplicacion_de_gestion_de_proyectos.entity.Project;
import com.example.aplicacion_de_gestion_de_proyectos.entity.Task;
import com.example.aplicacion_de_gestion_de_proyectos.entity.User;
import com.example.aplicacion_de_gestion_de_proyectos.mapper.TaskMapper;
import com.example.aplicacion_de_gestion_de_proyectos.repository.ProjectRepository;
import com.example.aplicacion_de_gestion_de_proyectos.repository.TaskRepository;
import com.example.aplicacion_de_gestion_de_proyectos.repository.UserRepository;
import com.example.aplicacion_de_gestion_de_proyectos.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Override
    public TaskResponse createTask(TaskRequest request) {

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepository.findById(request.getAssignedUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = TaskMapper.toEntity(request, project, user);

        taskRepository.save(task);

        return TaskMapper.toResponse(task);
    }

    @Override
    public List<TaskResponse> getTasksByProject(Long projectId) {

        return taskRepository.findByProjectId(projectId)
                .stream()
                .map(TaskMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse updateTaskStatus(Long taskId, String status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));
        task.setStatus(status);
        taskRepository.save(task);
        return TaskMapper.toResponse(task);
    }

    @Override
    public void deleteById(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("La tarea no existe");
        }
        taskRepository.deleteById(id);
    }
}
