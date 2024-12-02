package com.server.controllers;

import com.server.models.Comment;
import com.server.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Get all comments for a specific question
    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<Comment>> getCommentsByQuestionId(@PathVariable String questionId) {
        return ResponseEntity.ok(commentService.getCommentsByQuestionId(questionId));
    }

    // Get all comments for a specific question ordered by creation date
    @GetMapping("/question/{questionId}/recent")
    public ResponseEntity<List<Comment>> getCommentsByQuestionIdOrderedByCreatedAtDesc(@PathVariable String questionId) {
        return ResponseEntity.ok(commentService.getCommentsByQuestionIdOrderedByCreatedAtDesc(questionId));
    }

    // Get all comments by a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Comment>> getCommentsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(commentService.getCommentsByUserId(userId));
    }

    // Get a specific comment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable String id) {
        return commentService.getCommentById(id)
                .map(comment -> ResponseEntity.ok(comment))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create a new comment
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createComment(comment));
    }

    // Update an existing comment
    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable String id, @RequestBody String newBody) {
        try {
            return ResponseEntity.ok(commentService.updateComment(id, newBody));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a comment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable String id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}