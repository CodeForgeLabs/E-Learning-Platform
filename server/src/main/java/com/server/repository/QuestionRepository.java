package com.server.repositories;

import com.server.models.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {

    // Find all questions by a user's ID
    List<Question> findByAuthor_Id(String userId);

    // Find questions with a title containing a specific string (case-insensitive)
    List<Question> findByTitleContainingIgnoreCase(String title);


}
