package com.server.services;

import com.server.models.User;
import com.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


//This class serves as a middle man between controller and
//repository layers.
@Service
public class UserService {

    // @Autowired is used for dependency injection in Spring.
    // It automatically injects the required dependencies into this class.
    @Autowired
    UserRepository userRepository;

    @Autowired
    private  BCryptPasswordEncoder passwordEncoder;


    public User saveUser(User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    //used to check if user exists in the database
    //return an empty Optional if the user doesn't exist
    public Optional<User> findById(String userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser;
    }

    //returns an empty Optional if user doesn't exist
    public Optional<User> findByUsername(String username){
        Optional<User> optionalUser = userRepository.findByUsername(username);
        return optionalUser;
    }

    //this checks if the pas
    public boolean checkPassword(String rawPassword, String hashedPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("in checkPassword method");
        if (passwordEncoder.matches(rawPassword, hashedPassword)){
            System.out.println("Password matches");
            return true;// match plain password with hashed password
        } else {
            System.out.println("Incorrect Password");
            return false;
        }
    }

    //this looks for a user by the username and email
    //if one of them exists in the database, then the user exists
    public Optional<User> findByUsernameOrEmail(String username, String email) {
        Optional<User> userByEmail = userRepository.findByEmail(email);
        if (userByEmail.isPresent()) {
            return userByEmail;
        } else {
            return userRepository.findByUsername(username);
        }
    }

    //deletes a user by identifying with the id
    //only intended to be called from the userDashboard
    //so no need for creating guard rails with the Optional class
    public void deleteUserById(String userId){
        userRepository.deleteById(userId);
    }

    public Optional<User> updateUsername(String userId,String newUsername){
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()){
            User existingUser = user.get();
            existingUser.setUsername(newUsername);
            userRepository.save(existingUser);
            return Optional.of(existingUser);
        }
        return  Optional.empty();
    }


    //returns a list of users
    //only meant for checking database purposes
    //and for admin use only
    //needs auth to be implemented for access to this
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }


}