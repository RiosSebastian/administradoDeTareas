package com.example.aplicacion_de_gestion_de_proyectos.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
