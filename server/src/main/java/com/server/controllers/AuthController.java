package com.server.controllers;


import com.server.services.UserService;
import com.server.utils.JwtUtil;
import com.server.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    //this creates a new user if the username doesn't exist
    //handle the issue with lowercasing and uppercasing
    //are Meheret,MEHeret,meheret the same?
    @PostMapping("/register")
    public ResponseEntity<User> registerNewUser(@RequestBody User user){
        Optional<User> existingUser  = userService.findByUsernameOrEmail(user.getUsername(),user.getEmail());
        if (existingUser.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } else {
            User savedUser = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {

        String username = user.getUsername();
        String password = user.getPassword();

        if (password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password cannot be null");
        }
        Optional<User> existingUser = userService.findByUsername(username);
        if (existingUser.isPresent() && userService.checkPassword(user.getPassword(), existingUser.get().getPassword())) {
            String token = jwtUtil.generateToken(existingUser.get().getUsername());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

}
