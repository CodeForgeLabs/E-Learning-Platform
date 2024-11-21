package com.server.controllers;

import com.server.models.Answer;
import com.server.services.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    // Add an answer to a question
    @PostMapping
    public ResponseEntity<Answer> addAnswer(@RequestBody Answer answer) {
        Answer createdAnswer = answerService.addAnswer(answer);
        return ResponseEntity.status(201).body(createdAnswer);
    }

    // Get all answers for a specific question
    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<Answer>> getAnswersForQuestion(@PathVariable String questionId) {
        List<Answer> answers = answerService.getAnswersByQuestionId(questionId);
        return ResponseEntity.ok(answers);
    }

    // Mark an answer as accepted
    @PatchMapping("/{id}/accept")
    public ResponseEntity<?> markAnswerAsAccepted(@PathVariable String id) {
        try {
            answerService.markAsAccepted(id);
            return ResponseEntity.ok("Answer marked as accepted!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Upvote an answer
    @PatchMapping("/{id}/upvote")
    public ResponseEntity<?> upvoteAnswer(@PathVariable String id) {
        try {
            answerService.upvoteAnswer(id);
            return ResponseEntity.ok("Answer upvoted successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Delete an answer
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnswer(@PathVariable String id) {
        try {
            answerService.deleteAnswer(id);
            return ResponseEntity.ok("Answer deleted successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
