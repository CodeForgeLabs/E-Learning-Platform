package com.server.controllers;

import com.server.models.Question;
import com.server.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // Create a new question with tags
    @PostMapping("/create")
    public ResponseEntity<?> createQuestion(@RequestBody Question question, @RequestParam List<String> tagNames) {
        try {
            Question createdQuestion = questionService.createQuestion(question, tagNames);
            return ResponseEntity.ok(createdQuestion);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all questions associated with a specific tag
    @GetMapping("/tag/{tagName}")
    public ResponseEntity<List<Question>> getQuestionsByTag(@PathVariable String tagName) {
        List<Question> questions = questionService.findQuestionsByTag(tagName);
        return ResponseEntity.ok(questions);
    }
}
