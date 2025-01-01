package com.server.models;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Document(collection = "Idea")
public class Idea extends  Question{

    public Idea(){
        super();
    }
}
