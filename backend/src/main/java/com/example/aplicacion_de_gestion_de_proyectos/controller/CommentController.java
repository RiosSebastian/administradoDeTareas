package com.example.aplicacion_de_gestion_de_proyectos.controller;

import com.example.aplicacion_de_gestion_de_proyectos.dto.CommentRequest;
import com.example.aplicacion_de_gestion_de_proyectos.dto.response.CommentResponse;
import com.example.aplicacion_de_gestion_de_proyectos.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public CommentResponse createComment(@RequestBody CommentRequest request){

        return commentService.createComment(request);
    }

    @GetMapping("/task/{taskId}")
    public List<CommentResponse> getComments(@PathVariable Long taskId){

        return commentService.getCommentsByTask(taskId);
    }
}