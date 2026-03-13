package com.example.aplicacion_de_gestion_de_proyectos.controller;

import com.example.aplicacion_de_gestion_de_proyectos.dto.ProjectRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.ProjectResponse;
import com.example.aplicacion_de_gestion_de_proyectos.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ProjectResponse createProject(@RequestBody ProjectRequest request){

        return projectService.createProject(request);
    }

    @GetMapping("/user/{userId}")
    public List<ProjectResponse> getProjects(@PathVariable Long userId){

        return projectService.getProjectsByUser(userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
