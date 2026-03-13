package com.example.aplicacion_de_gestion_de_proyectos.service;

import com.example.aplicacion_de_gestion_de_proyectos.dto.LoginRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login(LoginRequest request);
}