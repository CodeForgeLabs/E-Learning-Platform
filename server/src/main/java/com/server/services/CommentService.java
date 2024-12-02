package com.server.services;

import com.server.models.Comment;
import com.server.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    // Create a new comment
    public Comment createComment(Comment comment) {
        // Ensure the createdAt timestamp is set when the comment is created
        if (comment.getCreatedAt() == null) {
            comment.setCreatedAt(LocalDateTime.now());
        }

        // Save the comment to the database
        return commentRepository.save(comment);
    }

    // Get all comments associated with a specific question by its ID
    public List<Comment> getCommentsByQuestionId(String questionId) {
        return commentRepository.findByQuestion_Id(questionId);
    }

    // Get all comments associated with a specific question by its ID ordered by creation date
    public List<Comment> getCommentsByQuestionIdOrderedByCreatedAtDesc(String questionId) {
        return commentRepository.findByQuestion_IdOrderByCreatedAtDesc(questionId);
    }

    // Get all comments by a specific user
    public List<Comment> getCommentsByUserId(String userId) {
        return commentRepository.findByAuthor_Id(userId);
    }

    // Get a comment by its ID
    public Optional<Comment> getCommentById(String commentId) {
        return commentRepository.findById(commentId);
    }

    // Update an existing comment
    public Comment updateComment(String commentId, String newBody) {
        // Find the comment by its ID
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // Update the body of the comment
        comment.setBody(newBody);

        // Save the updated comment
        return commentRepository.save(comment);
    }

    // Delete a comment by its ID
    public void deleteComment(String commentId) {
        commentRepository.deleteById(commentId);
    }
}
