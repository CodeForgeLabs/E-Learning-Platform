package com.server.repositories;

import com.server.models.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    // Find a question by title
    Optional<Question> findByTitle(String title);

    // Find all questions by a specific tag name
    List<Question> findByTags_Name(String tagName);
}
