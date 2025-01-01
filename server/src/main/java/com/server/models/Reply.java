package com.server.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Setter
@Getter
@Document(collection = "reply")
public class Reply {

    @Id
    private String id;

    private String body; // The content of the comment

    private LocalDateTime createdAt = LocalDateTime.now(); // Timestamp for when the comment was created

    @DBRef
    private User author; // Reference to the user who made the comment

    @DBRef
    private Idea idea;

    private int voteCount = 0;

    public void upvote() {
        this.voteCount++;
    }

    // Method to decrease vote count
    public void downvote() {
        this.voteCount--;
    }

    // No-arg constructor
    public Reply() {}
}
