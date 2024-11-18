package com.server.services;

import com.server.models.Answer;
import com.server.repositories.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    // Save a new answer
    public Answer saveAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    // Get all answers for a specific question
    public List<Answer> getAnswersByQuestionId(String questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    // Get an answer by its ID
    public Answer getAnswerById(String id) {
        return answerRepository.findById(id).orElse(null);
    }

    // Increment upvotes or downvotes for an answer
    public void voteOnAnswer(String answerId, boolean isUpvote) {
        Answer answer = answerRepository.findById(answerId).orElseThrow();
        if (isUpvote) {
            answer.setUpvotes(answer.getUpvotes() + 1);
        } else {
            answer.setDownvotes(answer.getDownvotes() + 1);
        }
        answerRepository.save(answer);
    }
}
