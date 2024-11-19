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
@Document(collection = "tags")
public class Tag {

    @Id
    private String id;

    private String name;

    @DBRef
    private Set<Question> questions = new HashSet<>(); // Many-to-many relationship with questions

    // No-arg constructor
    public Tag() {}

    public Tag(String name) {
        this.name = name;
    }
}
