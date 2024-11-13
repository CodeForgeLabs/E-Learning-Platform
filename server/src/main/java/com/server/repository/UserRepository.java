package com.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.server.models.User;

import java.util.Optional;

public  interface UserRepository extends MongoRepository<User,String>
{
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}