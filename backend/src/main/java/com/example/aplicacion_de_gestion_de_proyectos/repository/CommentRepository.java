package com.example.aplicacion_de_gestion_de_proyectos.repository;

import com.example.aplicacion_de_gestion_de_proyectos.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByTaskId(Long taskId);
}
