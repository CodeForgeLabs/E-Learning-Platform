package com.server.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Document(collection = "questions")
public class Question {

    @Id
    private String id;

    private String title;

    private String body;

    private int voteCount = 0;

    @DBRef
    private User author; // Reference to the author (User object)

    private List<String> tags; // Tags as String values (e.g., ["Java", "Spring"])

    private LocalDateTime createdAt = LocalDateTime.now();

    // No-arg constructor
    public Question() {}

    // Method to increase vote count
    public void upvote() {
        this.voteCount++;
    }

    // Method to decrease vote count
    public void downvote() {
        this.voteCount--;
    }
}
