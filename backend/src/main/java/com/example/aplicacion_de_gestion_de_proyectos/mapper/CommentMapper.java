package com.example.aplicacion_de_gestion_de_proyectos.mapper;

import com.example.aplicacion_de_gestion_de_proyectos.dto.CommentRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.CommentResponse;
import com.example.aplicacion_de_gestion_de_proyectos.entity.Comment;
import com.example.aplicacion_de_gestion_de_proyectos.entity.Task;
import com.example.aplicacion_de_gestion_de_proyectos.entity.User;

public class CommentMapper {

    public static Comment toEntity(CommentRequest request, Task task, User user){

        return Comment.builder()
                .content(request.getContent())
                .task(task)
                .user(user)
                .build();
    }

    public static CommentResponse toResponse(Comment comment){

        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .userName(comment.getUser().getName())
                .build();
    }

}
