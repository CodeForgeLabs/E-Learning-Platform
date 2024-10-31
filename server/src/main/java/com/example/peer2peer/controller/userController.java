package com.example.peer2peer.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class userController {
    @GetMapping("users/check")
    public  String getString(){
        return  "test string";
    }
}
