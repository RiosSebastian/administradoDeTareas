package com.example.aplicacion_de_gestion_de_proyectos.controller;

import com.example.aplicacion_de_gestion_de_proyectos.dto.LoginRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.UserRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.AuthResponse;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.UserResponse;
import com.example.aplicacion_de_gestion_de_proyectos.service.AuthService;
import com.example.aplicacion_de_gestion_de_proyectos.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/register")
    public UserResponse register(@RequestBody UserRequest request) {
        return userService.createUser(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}