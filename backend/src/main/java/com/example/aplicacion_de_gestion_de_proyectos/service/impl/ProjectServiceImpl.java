package com.example.aplicacion_de_gestion_de_proyectos.service.impl;

import com.example.aplicacion_de_gestion_de_proyectos.dto.ProjectRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.ProjectResponse;
import com.example.aplicacion_de_gestion_de_proyectos.entity.Project;
import com.example.aplicacion_de_gestion_de_proyectos.entity.User;
import com.example.aplicacion_de_gestion_de_proyectos.mapper.ProjectMapper;
import com.example.aplicacion_de_gestion_de_proyectos.repository.ProjectRepository;
import com.example.aplicacion_de_gestion_de_proyectos.repository.UserRepository;
import com.example.aplicacion_de_gestion_de_proyectos.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Override
    public ProjectResponse createProject(ProjectRequest request) {

        User creator = userRepository.findById(request.getCreatorId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = ProjectMapper.toEntity(request, creator);

        projectRepository.save(project);

        return ProjectMapper.toResponse(project);
    }

    @Override
    public List<ProjectResponse> getProjectsByUser(Long userId) {

        return projectRepository.findByCreatorId(userId)
                .stream()
                .map(ProjectMapper::toResponse)
                .collect(Collectors.toList());
    }


    @Override
    public void deleteById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
        projectRepository.delete(project);
    }
}
