package com.example.aplicacion_de_gestion_de_proyectos.dto;

import lombok.Data;

@Data
public class TaskRequest {

    private String title;
    private String description;
    private String status;
    private Long projectId;
    private Long assignedUserId;

}
