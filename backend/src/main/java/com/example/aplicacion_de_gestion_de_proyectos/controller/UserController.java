package com.example.aplicacion_de_gestion_de_proyectos.controller;

import com.example.aplicacion_de_gestion_de_proyectos.dto.UserRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.UserResponse;
import com.example.aplicacion_de_gestion_de_proyectos.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public UserResponse createUser(@RequestBody UserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping
    public List<UserResponse> getUsers() {
        return userService.getAllUsers();
    }
}