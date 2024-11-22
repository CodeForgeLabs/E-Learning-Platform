package com.server.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "tags")
public class Tag {

    @Id
    private String id;

    private String name; // Name of the tag

    // No-arg constructor
    public Tag() {}

    // Constructor with parameters for easier instantiation
    public Tag(String name) {
        this.name = name;
    }
}
