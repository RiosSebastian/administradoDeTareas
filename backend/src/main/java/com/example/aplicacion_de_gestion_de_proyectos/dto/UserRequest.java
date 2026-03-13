package com.example.aplicacion_de_gestion_de_proyectos.dto;

import lombok.Data;

@Data
public class UserRequest {

    private String name;
    private String email;
    private String password;
}