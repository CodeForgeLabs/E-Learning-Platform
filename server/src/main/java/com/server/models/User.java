package com.server.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String username;

    private String email;

    //url link to the image
    private String profilePicture;

    private String password;

    private String profession;

    private int reputation = 0; // Default reputation when a user registers

    private LocalDateTime createdAt = LocalDateTime.now();

    private Set<String> roles; // E.g., ["ROLE_USER"], ["ROLE_ADMIN"]

    // No-arg constructor (optional if Lombok is used)
    public User() {}
}
