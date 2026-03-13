package com.example.aplicacion_de_gestion_de_proyectos.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentResponse {

    private Long id;
    private String content;
    private String userName;
}