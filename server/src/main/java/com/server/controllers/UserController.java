package com.server.controllers;

import com.server.models.User;
import com.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok("User registered successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Optional<User> optionalUser = userService.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        User user = optionalUser.get();
        if (!userService.checkPassword(password, user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        return ResponseEntity.ok("Login successful!");
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
  
    //test with GET request to localhost:8080/users/list-all-users
    //returns a ResponseEntity(entire HTTP response)
    //with a list of User Objects
    @GetMapping("/list-all-users")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    };
   

    // Update username
    @PatchMapping("/{id}/username")
    public ResponseEntity<?> updateUsername(@PathVariable String id, @RequestParam String newUsername) {
        return userService.updateUsername(id, newUsername)
                .map(user -> ResponseEntity.ok("Username updated successfully!"))
                .orElse(ResponseEntity.notFound().build());
    }


    // Increment reputation
    @PatchMapping("/{id}/reputation")
    public ResponseEntity<?> incrementReputation(
            @PathVariable String id,
            @RequestParam int points) {
        try {
            userService.incrementReputation(id, points);
            return ResponseEntity.ok("Reputation updated successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable String id) {
        try {
            userService.deleteUserById(id);
            return ResponseEntity.ok("User deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
