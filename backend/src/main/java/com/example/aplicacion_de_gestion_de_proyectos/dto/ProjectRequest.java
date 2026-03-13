package com.example.aplicacion_de_gestion_de_proyectos.dto;

import lombok.Data;

@Data
public class ProjectRequest {

    private String name;
    private String description;
    private Long creatorId;
}
