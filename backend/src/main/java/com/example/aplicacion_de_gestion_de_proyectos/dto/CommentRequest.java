package com.example.aplicacion_de_gestion_de_proyectos.dto;

import lombok.Data;

@Data
public class CommentRequest {

    private String content;
    private Long taskId;
    private Long userId;
}
