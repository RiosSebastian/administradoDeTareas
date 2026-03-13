package com.example.aplicacion_de_gestion_de_proyectos.service.impl;

import com.example.aplicacion_de_gestion_de_proyectos.dto.LoginRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.AuthResponse;
import com.example.aplicacion_de_gestion_de_proyectos.entity.User;
import com.example.aplicacion_de_gestion_de_proyectos.mapper.UserMapper;
import com.example.aplicacion_de_gestion_de_proyectos.repository.UserRepository;
import com.example.aplicacion_de_gestion_de_proyectos.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest request) {
        // Buscar al usuario por email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Verificar la contraseña encriptada
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        // Generar el token JWT
        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .user(UserMapper.toResponse(user))
                .build();
    }
}
