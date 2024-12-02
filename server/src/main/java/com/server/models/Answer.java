package com.server.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@Document(collection = "answers")
public class Answer {

    @Id
    private String id;

    private String body; // The content of the answer

    private int voteCount = 0; // To track the number of votes this answer has received

    private boolean accepted = false; // Indicates if this answer is accepted as the correct one

    @DBRef
    private Question question; // Reference to the associated question

    @DBRef
    private User author; // Reference to the user who answered

    private LocalDateTime createdAt = LocalDateTime.now();

    // No-arg constructor
    public Answer() {}

    // Method to increase vote count
    public void upvote() {
        this.voteCount++;
    }

    // Method to decrease vote count
    public void downvote() {
        this.voteCount--;
    }
}
