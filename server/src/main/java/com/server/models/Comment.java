package com.server.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@Document(collection = "comments")
public class Comment {

    @Id
    private String id;

    private String body; // The content of the comment

    private LocalDateTime createdAt = LocalDateTime.now(); // Timestamp for when the comment was created

    @DBRef
    private User author; // Reference to the user who made the comment

    @DBRef
    private Question question; // Optional reference to the associated question (if applicable)

    // No-arg constructor
    public Comment() {}
}
