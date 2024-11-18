package com.server.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Document(collection = "questions")
public class Question {

    @Id
    private String id;

    private String title;

    private String body;

    private String authorId; // Reference to the author (User ID)

    @DBRef
    private Set<Tag> tags = new HashSet<>(); // Many-to-many relationship with tags

    private int upvotes;

    private int downvotes;

    private Set<String> answerIds; // References to answers

    private long createdAt;

    private long updatedAt;

    // No-arg constructor
    public Question() {}
}
