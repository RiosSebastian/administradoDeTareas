package com.example.aplicacion_de_gestion_de_proyectos.service.impl;

import com.example.aplicacion_de_gestion_de_proyectos.dto.UserRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.UserResponse;
import com.example.aplicacion_de_gestion_de_proyectos.entity.User;
import com.example.aplicacion_de_gestion_de_proyectos.mapper.UserMapper;
import com.example.aplicacion_de_gestion_de_proyectos.repository.UserRepository;
import com.example.aplicacion_de_gestion_de_proyectos.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Inyectado desde la config de seguridad


    @Override
    public UserResponse createUser(UserRequest request) {
        User user = UserMapper.toEntity(request);
        // Encriptar contraseña para seguridad general
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        return UserMapper.toResponse(user);
    }


    @Override
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
    }
}
