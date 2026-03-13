package com.example.aplicacion_de_gestion_de_proyectos.mapper;

import com.example.aplicacion_de_gestion_de_proyectos.dto.UserRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.UserResponse;
import com.example.aplicacion_de_gestion_de_proyectos.entity.User;

public class UserMapper {

    public static User toEntity(UserRequest request) {
        return User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
    }

    public static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}