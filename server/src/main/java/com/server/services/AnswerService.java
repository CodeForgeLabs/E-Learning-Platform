package com.server.services;

import com.server.models.Answer;
import com.server.repositories.AnswerRepository;
import com.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private VoteService voteService;

    @Autowired
    private UserRepository userRepository;

    // Create a new answer for a question
    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer); // Save the answer to the repository
    }

    // Get all answers for a specific question by question ID
    public List<Answer> getAnswersByQuestionId(String questionId) {
        return answerRepository.findByQuestion_Id(questionId); // Find answers by question ID
    }

    // Get a specific answer by its ID
    public Optional<Answer> getAnswerById(String id) {
        return answerRepository.findById(id); // Find an answer by its ID
    }

    // Update an existing answer
    public Answer updateAnswer(String id, Answer answerDetails) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Answer not found")); // Handle if answer not found

        // Update fields of the existing answer
        answer.setBody(answerDetails.getBody());
        answer.setAccepted(answerDetails.isAccepted());

        return answerRepository.save(answer); // Save the updated answer to the repository
    }

    // Delete an answer by its ID
    public void deleteAnswer(String id) {
        answerRepository.deleteById(id); // Delete the answer from the repository by ID
    }

    // Upvote or downvote an answer using VoteService
    public String voteAnswer(String userId, String answerId, boolean isUpvote) {
        return voteService.voteAnswer(userId, answerId, isUpvote); // Call voteService to handle voting
    }

    // Get all answers by a specific user (by user ID)
    public List<Answer> getAnswersByUserId(String userId) {
        return answerRepository.findByAuthor_Id(userId); // Find answers by the author (user) ID
    }
}
