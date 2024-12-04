package com.server.controllers;


import com.server.services.UserService;
import com.server.utils.JwtUtil;
import com.server.models.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
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
    public ResponseEntity<?> registerNewUser(@RequestBody User user){
        Optional<User> existingUser  = userService.findByUsername(user.getUsername());
        if (existingUser.isPresent()){
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Username is already taken.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        } else {
            User savedUser = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user, HttpServletResponse response) {

        String username = user.getUsername();
        String password = user.getPassword();

        if (password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password cannot be null");
        }
        Optional<User> existingUser = userService.findByUsername(username);
        if (existingUser.isPresent() && userService.checkPassword(user.getPassword(), existingUser.get().getPassword())) {
            String token = jwtUtil.generateToken(existingUser.get().getUsername());
            Cookie cookie = new Cookie("JWT_TOKEN",token);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(24*60*60);
            cookie.setSecure(true);
            response.addCookie(cookie);
            response.setStatus(HttpServletResponse.SC_OK);
            Map<String, Object> filteredUser = Map.of(
                    "id", existingUser.get().getId(),
                    "username", existingUser.get().getUsername(),
                    "profilePicture", existingUser.get().getProfilePicture(),
                    "reputation", existingUser.get().getReputation(),
                    "roles", existingUser.get().getRoles()
            );
            System.out.println("ok 200");
            return ResponseEntity.ok(filteredUser);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid username or password.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

}
