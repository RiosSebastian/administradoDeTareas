package com.example.aplicacion_de_gestion_de_proyectos.config;

import com.example.aplicacion_de_gestion_de_proyectos.entity.User;
import com.example.aplicacion_de_gestion_de_proyectos.repository.UserRepository;
import com.example.aplicacion_de_gestion_de_proyectos.service.impl.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Manejo de Preflight (CORS)

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        final String authHeader = request.getHeader("Authorization");

        // 2. Validar presencia del Header Authorization
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(jwt);

        // 3. Si hay email y no estamos ya autenticados en el contexto
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepository.findByEmail(userEmail).orElse(null);

            // 4. Validar token contra el usuario de la DB
            if (user != null && jwtService.isTokenValid(jwt, user.getEmail())) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        Collections.emptyList()
                );

                // 5. Vincular la petición actual (IP, Sesión) al token de autenticación
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 6. Establecer la autenticación global
                SecurityContextHolder.getContext().setAuthentication(authToken);

                // Log útil para depuración en la consola de IntelliJ
                System.out.println(">>> Usuario autenticado: " + userEmail);
            } else {
                System.out.println(">>> Token inválido para: " + userEmail);
            }
        }

        filterChain.doFilter(request, response);
    }
}