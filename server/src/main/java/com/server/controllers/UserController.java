package com.server.controllers;


import com.server.models.User;
import com.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


//marks the UserController as a REST api controller
//mapping the base URL to the controller
//all http requests are relative to /users
//getusers -> localhost:8080/users/get-users
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    //test with a POST request to localhost:8080/users/create-user
    //creates a User and saves in the database
    //issues with lowercase and uppercase exist
    //are LordMhri,lordmhri and LoRDMhri the same?
    //also findByUsername needs to be extended to findByUsernameOrEmail
    @PostMapping("/create-user")
    public ResponseEntity<User> createUser(@RequestBody User user){
        Optional<User> existingUser  = userService.findByUsername(user.getUsername());
        if (existingUser.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } else {
            User savedUser = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    //returns a ResponseEntity containing the user object
    //after finding by the username if user exists else
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    //update User details coming soon ...

    //assuming there is no problem with userId
    //it exists and the app access this endpoint from within the dashboard
    //aka the user exists
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<User> deleteUser(@PathVariable String userId) {
        userService.deleteUserById(userId);
        return ResponseEntity.ok().build();
    }


    //test with GET request to localhost:8080/list-all-users
    //returns a ResponseEntity(entire HTTP response)
    //with a list of User Objects
    @GetMapping("/list-all-users")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

}
