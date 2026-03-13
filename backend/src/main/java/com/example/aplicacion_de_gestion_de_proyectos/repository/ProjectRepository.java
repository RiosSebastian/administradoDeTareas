package com.example.aplicacion_de_gestion_de_proyectos.repository;

import com.example.aplicacion_de_gestion_de_proyectos.entity.Project;
import com.example.aplicacion_de_gestion_de_proyectos.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByCreatorId(Long creatorId);
}