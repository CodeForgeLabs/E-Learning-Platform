package com.server.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document(collection = "answers")
public class Answer {

    @Id
    private String id;

    private String body;         // The content of the answer
    private String questionId;   // The ID of the question this answer is related to
    private String authorId;     // The ID of the user who wrote the answer
    private int upvotes = 0;     // The number of upvotes this answer has
    private int downvotes = 0;   // The number of downvotes this answer has
    private String createdAt;    // The timestamp of when the answer was created
    private String updatedAt;    // The timestamp of the last update to the answer

    // No-arg constructor (optional if Lombok is used)
    public Answer() {}
}
