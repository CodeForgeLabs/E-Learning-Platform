package com.server.services;

import com.server.models.User;
import com.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public User saveUser(User user){
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