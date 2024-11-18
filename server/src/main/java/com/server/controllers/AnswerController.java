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

    // Endpoint to create a new answer
    @PostMapping
    public ResponseEntity<Answer> createAnswer(@RequestBody Answer answer) {
        Answer savedAnswer = answerService.saveAnswer(answer);
        return ResponseEntity.ok(savedAnswer);
    }

    // Endpoint to get all answers for a specific question
    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<Answer>> getAnswersByQuestionId(@PathVariable String questionId) {
        List<Answer> answers = answerService.getAnswersByQuestionId(questionId);
        return ResponseEntity.ok(answers);
    }

    // Endpoint to get an answer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Answer> getAnswerById(@PathVariable String id) {
        Answer answer = answerService.getAnswerById(id);
        if (answer != null) {
            return ResponseEntity.ok(answer);
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint to vote on an answer (upvote or downvote)
    @PatchMapping("/{id}/vote")
    public ResponseEntity<?> voteOnAnswer(
            @PathVariable String id,
            @RequestParam boolean isUpvote) {
        try {
            answerService.voteOnAnswer(id, isUpvote);
            return ResponseEntity.ok("Vote recorded successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error voting on answer.");
        }
    }
}
