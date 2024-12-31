package com.server.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@Document(collection = "votes")
public class Vote {

    @Id
    private String id;

    private boolean isUpvote; // true for upvote, false for downvote

    @DBRef
    private User voter; // Reference to the user who voted

    @DBRef
    private Question question; // Optional reference to the question being voted on (if applicable)

    private Idea idea; // Optional reference to the idea being voted on (if applicable)

    @DBRef
    private Answer answer; // Optional reference to the answer being voted on (if applicable)

    private LocalDateTime createdAt = LocalDateTime.now(); // Timestamp for when the vote was created

    // No-arg constructor
    public Vote() {}

    // Apply the vote to the Question or Answer and update vote count
    public void applyVote() {
        if (isUpvote) {
            if (this.question != null) {
                this.question.upvote();
            } else if (this.answer != null) {
                this.answer.upvote();
            }
        } else {
            if (this.question != null) {
                this.question.downvote();
            } else if (this.answer != null) {
                this.answer.downvote();
            }
        }
    }
}
