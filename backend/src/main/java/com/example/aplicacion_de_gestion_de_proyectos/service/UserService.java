package com.example.aplicacion_de_gestion_de_proyectos.service;

import com.example.aplicacion_de_gestion_de_proyectos.dto.UserRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    List<UserResponse> getAllUsers();
}
