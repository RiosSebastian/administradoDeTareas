package com.example.aplicacion_de_gestion_de_proyectos.service;

import com.example.aplicacion_de_gestion_de_proyectos.dto.CommentRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.CommentResponse;

import java.util.List;

public interface CommentService {
    CommentResponse createComment(CommentRequest request);

    List<CommentResponse> getCommentsByTask(Long taskId);
}
