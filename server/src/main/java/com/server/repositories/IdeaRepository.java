package com.server.repositories;

import com.server.models.Idea;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaRepository extends MongoRepository<Idea, String> {
    // Find all ideas by a specific user's ID
    List<Idea> findByAuthor_Id(String userId);

    // Find ideas with a title containing a specific string (case-insensitive)
    List<Idea> findByTitleContainingIgnoreCase(String title);

    // Find ideas by a tag name
    List<Idea> findByTagsContaining(String tagName); // Adjusted to match List<String> for tags

    // Find ideas with a vote count greater than a specified value
    List<Idea> findByVoteCountGreaterThan(int voteCount);

    // Find ideas sorted by creation date (most recent first)
    List<Idea> findByOrderByCreatedAtDesc();

    //Find all ideas by most upvoted
    List<Idea> findByOrderByVoteCountDesc();

    List<Idea> findByTagsIgnoreCaseContaining(String tagName);
}
