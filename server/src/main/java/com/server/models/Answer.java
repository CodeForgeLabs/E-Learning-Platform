package com.server.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "answers")
public class Answer {

    @Id
    private String id;

    private String body; // The content of the answer

    private int upvotes = 0; // To track the number of upvotes

    private boolean accepted = false; // Indicates if this answer is accepted as the correct one

    @DBRef
    private Question question; // Reference to the associated question

    @DBRef
    private User author; // Reference to the user who answered

    // No-arg constructor
    public Answer() {}
}
