package com.server.controllers;

import com.server.models.Tag;
import com.server.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    // Get all tags
    @GetMapping
    public ResponseEntity<List<Tag>> getAllTags() {
        return ResponseEntity.ok(tagService.getTagsByPopularity(0));  // Change as per requirement (popularity filter)
    }

    // Get a tag by name
    @GetMapping("/{name}")
    public ResponseEntity<Tag> getTagByName(@PathVariable String name) {
        Tag tag = tagService.getTagByName(name);
        return tag != null ? ResponseEntity.ok(tag) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Add tags to a question and create them if they don't exist
    @PostMapping("/add")
    public ResponseEntity<Void> addTagsToQuestion(@RequestParam List<String> tagNames, @RequestParam String questionId) {
        tagService.addTagsToQuestion(tagNames);  // Corrected to pass only tag names
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // Get tags by popularity
    @GetMapping("/popular/{popularityCount}")
    public ResponseEntity<List<Tag>> getTagsByPopularity(@PathVariable int popularityCount) {
        return ResponseEntity.ok(tagService.getTagsByPopularity(popularityCount));
    }
}
