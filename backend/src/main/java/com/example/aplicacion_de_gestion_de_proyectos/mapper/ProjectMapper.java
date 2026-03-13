package com.example.aplicacion_de_gestion_de_proyectos.mapper;

import com.example.aplicacion_de_gestion_de_proyectos.dto.ProjectRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.ProjectResponse;
import com.example.aplicacion_de_gestion_de_proyectos.entity.Project;
import com.example.aplicacion_de_gestion_de_proyectos.entity.User;

public class ProjectMapper {

    public static Project toEntity(ProjectRequest request, User creator){

        return Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .creator(creator)
                .build();
    }

    public static ProjectResponse toResponse(Project project){

        return ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .build();
    }

}
