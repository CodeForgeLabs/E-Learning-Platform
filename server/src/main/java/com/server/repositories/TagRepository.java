package com.server.repositories;

import com.server.models.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends MongoRepository<Tag, String> {
    // Find a tag by its name
    Tag findByName(String name);

    // Find tags with a popularity count greater than a specified value
    List<Tag> findByPopularityCountGreaterThan(int popularityCount);
}
