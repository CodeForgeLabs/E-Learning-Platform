package com.server.controllers;

import com.server.models.Question;
import com.server.services.QuestionService;
import com.server.services.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;
    private final VoteService voteService;

    @Autowired
    public QuestionController(QuestionService questionService, VoteService voteService) {
        this.questionService = questionService;
        this.voteService = voteService;
    }

    // Get all questions
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    // Get a specific question by ID
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable String id) {
        return questionService.getQuestionById(id)
                .map(question -> ResponseEntity.ok(question))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create a new question
    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.createQuestion(question));
    }

    // Update a question
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable String id, @RequestBody Question questionDetails) {
        try {
            return ResponseEntity.ok(questionService.updateQuestion(id, questionDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a question
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable String id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    // Upvote or downvote a question
    @PostMapping("/{questionId}/vote")
    public ResponseEntity<String> voteQuestion(@RequestParam String userId, @PathVariable String questionId, @RequestParam boolean isUpvote) {
        return ResponseEntity.ok(voteService.voteQuestion(userId, questionId, isUpvote));
    }

    // Get all questions by a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Question>> getQuestionsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(questionService.getQuestionsByUserId(userId));
    }

    // Find questions by title (case-insensitive)
    @GetMapping("/title/{title}")
    public ResponseEntity<List<Question>> getQuestionsByTitle(@PathVariable String title) {
        return ResponseEntity.ok(questionService.getQuestionsByTitle(title));
    }

    // Find questions by a specific tag
    @GetMapping("/tag/{tagName}")
    public ResponseEntity<List<Question>> getQuestionsByTag(@PathVariable String tagName) {
        return ResponseEntity.ok(questionService.getQuestionsByTag(tagName));
    }
}
