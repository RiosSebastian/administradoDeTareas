package com.example.aplicacion_de_gestion_de_proyectos.service;

import com.example.aplicacion_de_gestion_de_proyectos.dto.ProjectRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.ProjectResponse;

import java.util.List;

public interface ProjectService {
    ProjectResponse createProject(ProjectRequest request);

    List<ProjectResponse> getProjectsByUser(Long userId);

    void deleteById(Long id);
}
