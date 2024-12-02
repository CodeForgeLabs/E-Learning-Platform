package com.server.controllers;

import com.server.models.Answer;
import com.server.services.AnswerService;
import com.server.services.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @Autowired
    private VoteService voteService;

    // Get all answers for a specific question
    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<Answer>> getAnswersByQuestionId(@PathVariable String questionId) {
        return ResponseEntity.ok(answerService.getAnswersByQuestionId(questionId));
    }

    // Get a specific answer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Answer> getAnswerById(@PathVariable String id) {
        return answerService.getAnswerById(id)
                .map(answer -> ResponseEntity.ok(answer))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create a new answer for a question
    @PostMapping
    public ResponseEntity<Answer> createAnswer(@RequestBody Answer answer) {
        return ResponseEntity.status(HttpStatus.CREATED).body(answerService.createAnswer(answer));
    }

    // Update an existing answer
    @PutMapping("/{id}")
    public ResponseEntity<Answer> updateAnswer(@PathVariable String id, @RequestBody Answer answerDetails) {
        try {
            return ResponseEntity.ok(answerService.updateAnswer(id, answerDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete an answer by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable String id) {
        answerService.deleteAnswer(id);
        return ResponseEntity.noContent().build();
    }

    // Upvote or downvote an answer
    @PostMapping("/{answerId}/vote")
    public ResponseEntity<String> voteAnswer(@RequestParam String userId, @PathVariable String answerId, @RequestParam boolean isUpvote) {
        return ResponseEntity.ok(voteService.voteAnswer(userId, answerId, isUpvote));
    }

    // Get all answers by a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Answer>> getAnswersByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(answerService.getAnswersByUserId(userId));
    }
   // Accept an answer by its ID
    @PatchMapping("/{id}/accept")
    public ResponseEntity<Answer> acceptAnswer(@PathVariable String id) {
        try {
            return ResponseEntity.ok(answerService.acceptAnswer(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
