package com.server.controllers;

import com.server.models.Tag;
import com.server.models.Question;
import com.server.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    // Add an existing tag to an existing question by questionId
    @PostMapping("/question/{questionId}")
    public ResponseEntity<?> addTagToQuestion(@PathVariable String questionId, @RequestBody Tag tag) {
        try {
            Tag updatedTag = tagService.addTagToQuestion(questionId, tag);
            return ResponseEntity.ok(updatedTag);  // Return the tag that was added to the question
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());  // Return an error message if the question is not found
        }
    }

    // Get a tag by name
    @GetMapping("/{name}")
    public ResponseEntity<Tag> getTagByName(@PathVariable String name) {
        Tag tag = tagService.findTagByName(name);
        return tag != null ? ResponseEntity.ok(tag) : ResponseEntity.notFound().build();
    }

    // Get all questions by tag name
    @GetMapping("/questions/{tagName}")
    public ResponseEntity<List<Question>> getQuestionsByTagName(@PathVariable String tagName) {
        try {
            List<Question> questions = tagService.findQuestionsByTagName(tagName);
            return ResponseEntity.ok(questions);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();  // Tag not found or no questions
        }
    }
}
