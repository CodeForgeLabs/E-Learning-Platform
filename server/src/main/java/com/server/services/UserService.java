package com.server.services;

import com.server.models.User;
import com.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Register or save a new user
    public User saveUser(User user) {


        // Encrypt password and assign default fields
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.getProfilePicture() == null)
            user.setProfilePicture("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW4kzIb_8SII6G7Bl4BCPfRmLZVVtc2kW6g&s");
        else{
            user.setProfilePicture(user.getProfilePicture());

        }
         // this is a default userProfile for every user
        user.setRoles(Set.of("ROLE_USER")); // Default role
        user.setReputation(0); // Default reputation

        return userRepository.save(user);
    }

    public User saveExistingUser(User user) {
        return userRepository.save(user);
    }

    //update profile picture of user
    public Optional<User> updateProfilePicture(String userId,String profilepictureUrl){
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()){
            User existingUser = user.get();
            existingUser.setProfilePicture(profilepictureUrl);
            userRepository.save(existingUser);
            return Optional.of(existingUser);
        }
        return Optional.empty();
    }

    // Check if the provided raw password matches the hashed password
    public boolean checkPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    // Find a user by ID
    public Optional<User> findById(String userId) {
        return userRepository.findById(userId);
    }

    // Find a user by username
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Find a user by username or email
    public Optional<User> findByUsernameOrEmail(String username, String email) {
        Optional<User> userByEmail = userRepository.findByEmail(email);
        if (userByEmail.isPresent()) {
            return userByEmail;
        }
        return userRepository.findByUsername(username);
    }

    // Update a user's username
    public Optional<User> updateUsername(String userId, String newUsername) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setUsername(newUsername);
            userRepository.save(existingUser);
            return Optional.of(existingUser);
        }
        return Optional.empty();
    }

    // Delete a user by ID
    public void deleteUserById(String userId) {
        userRepository.deleteById(userId);
    }

    // Get all users (Admin use only)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Increment user reputation
    public void incrementReputation(String userId, int points) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setReputation(user.getReputation() + points);
        userRepository.save(user);
    }
}
