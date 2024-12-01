package com.server.repositories;

import com.server.models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    // Find comments by the associated question's ID
    List<Comment> findByQuestion_Id(String questionId); // Use underscores to match field names

    // Find comments by a specific user's ID
    List<Comment> findByAuthor_Id(String userId); // Use underscores to match field names
}
