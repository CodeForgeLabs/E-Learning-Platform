package com.server.services;

import com.server.models.Reply;
import com.server.repositories.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReplyService {

    @Autowired
    private ReplyRepository replyRepository;

    // Create a new Reply
    public Reply createReply(Reply Reply) {
        // Ensure the createdAt timestamp is set when the Reply is created
        if (Reply.getCreatedAt() == null) {
            Reply.setCreatedAt(LocalDateTime.now());
        }

        // Save the Reply to the database
        return replyRepository.save(Reply);
    }

    public Optional<Reply> getReplyById(String id){
        return replyRepository.findById(id);
    }
    

    // Get all Replys associated with a specific question by its ID
    public List<Reply> getRepliesByIdea(String questionId) {
        return replyRepository.findByIdea_Id(questionId);
    }

    // Get all Replys associated with a specific question by its ID ordered by creation date
//    public List<Reply> getRepliesByIdeaIdOrderedByCreatedAtDesc(String questionId) {
//        return replyRepository.findByIdea_IdOrderedByCreatedAtDesc(questionId);
//    }

    // Get all Replys by a specific user
    public List<Reply> getRepliesByUserId(String userId) {
        return replyRepository.findByAuthor_Id(userId);
    }

    // Get a Reply by its ID
    public Optional<Reply> getRepliesByIdeaID(String ReplyId) {
        return replyRepository.findById(ReplyId);
    }

    // Update an existing Reply
    public Reply updateReply(String ReplyId, String newBody) {
        // Find the Reply by its ID
        Reply Reply = replyRepository.findById(ReplyId)
                .orElseThrow(() -> new RuntimeException("Reply not found"));

        // Update the body of the Reply
        Reply.setBody(newBody);

        // Save the updated Reply
        return replyRepository.save(Reply);
    }

    // Delete a Reply by its ID
    public void deleteReply(String ReplyId) {
    replyRepository.deleteById(ReplyId);
    }
}
