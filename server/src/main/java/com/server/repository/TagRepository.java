package com.server.repositories;

import com.server.models.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends MongoRepository<Tag, String> {
    // Find a tag by name
    Optional<Tag> findByName(String name);

    // Check if a tag exists by name
    boolean existsByName(String name);
}
