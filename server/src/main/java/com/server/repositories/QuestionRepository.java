package com.server.repositories;

import com.server.models.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    // Find all questions by a specific user's ID
    List<Question> findByAuthor_Id(String userId);

    // Find questions with a title containing a specific string (case-insensitive)
    List<Question> findByTitleContainingIgnoreCase(String title);

    // Find questions by a tag name
    List<Question> findByTagsContaining(String tagName); // Adjusted to match List<String> for tags

    // Find questions with a vote count greater than a specified value
    List<Question> findByVoteCountGreaterThan(int voteCount);

    // Find questions sorted by creation date (most recent first)
    List<Question> findByOrderByCreatedAtDesc();

    List<Question> findByTagsIgnoreCaseContaining(String tagName);
}
