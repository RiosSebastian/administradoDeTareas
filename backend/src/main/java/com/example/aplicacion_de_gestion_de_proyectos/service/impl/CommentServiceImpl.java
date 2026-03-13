package com.example.aplicacion_de_gestion_de_proyectos.service.impl;

import com.example.aplicacion_de_gestion_de_proyectos.dto.CommentRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.CommentResponse;
import com.example.aplicacion_de_gestion_de_proyectos.entity.Comment;
import com.example.aplicacion_de_gestion_de_proyectos.entity.Task;
import com.example.aplicacion_de_gestion_de_proyectos.entity.User;
import com.example.aplicacion_de_gestion_de_proyectos.mapper.CommentMapper;
import com.example.aplicacion_de_gestion_de_proyectos.repository.CommentRepository;
import com.example.aplicacion_de_gestion_de_proyectos.repository.TaskRepository;
import com.example.aplicacion_de_gestion_de_proyectos.repository.UserRepository;
import com.example.aplicacion_de_gestion_de_proyectos.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public CommentResponse createComment(CommentRequest request) {

        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new RuntimeException("Task not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = CommentMapper.toEntity(request, task, user);

        commentRepository.save(comment);

        return CommentMapper.toResponse(comment);
    }

    @Override
    public List<CommentResponse> getCommentsByTask(Long taskId) {

        return commentRepository.findByTaskId(taskId)
                .stream()
                .map(CommentMapper::toResponse)
                .collect(Collectors.toList());
    }
}