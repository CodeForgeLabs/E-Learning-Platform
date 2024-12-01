package com.server.repositories;

import com.server.models.Vote;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends MongoRepository<Vote, String> {
    // Find votes for a specific question by its ID
    List<Vote> findByQuestion_Id(String questionId); // Use underscores in field names

    // Find votes for a specific answer by its ID
    List<Vote> findByAnswer_Id(String answerId); // Use underscores in field names
}
