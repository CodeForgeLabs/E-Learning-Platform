package com.server.models;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


//creates a getter and setter on compile automatically
//no need to write getter and setter for each class field
@Getter
@Setter
@Document(collection = "users")
public class User {

    //primary key annotation
    //when user is created the id field will be the primary key
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    //might add more things like upvotes?

}


