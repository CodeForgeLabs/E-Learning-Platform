package com.server.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@Document(collection = "tags")
public class Tag {

    @Id
    private String id;

    private String name; // Name of the tag

    private int popularityCount = 0; // Tracks the number of times this tag has been used in questions

    private LocalDateTime createdAt = LocalDateTime.now(); // Timestamp for when the tag was created or last updated
}
