package com.example.aplicacion_de_gestion_de_proyectos.controller;

import com.example.aplicacion_de_gestion_de_proyectos.dto.TaskRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.TaskResponse;
import com.example.aplicacion_de_gestion_de_proyectos.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public TaskResponse createTask(@RequestBody TaskRequest request){

        return taskService.createTask(request);
    }

    @GetMapping("/project/{projectId}")
    public List<TaskResponse> getTasks(@PathVariable Long projectId){

        return taskService.getTasksByProject(projectId);
    }

    @PutMapping("/{taskId}/status")
    public TaskResponse updateStatus(@PathVariable Long taskId, @RequestBody Map<String, String> body) {
        return taskService.updateTaskStatus(taskId, body.get("status"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}