package com.server.services;

import com.server.models.Answer;
import com.server.models.Question;
import com.server.repositories.AnswerRepository;
import com.server.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    // Add an answer
    public Answer addAnswer(Answer answer) {
        Optional<Question> question = questionRepository.findById(answer.getQuestion().getId());
        if (question.isEmpty()) {
            throw new IllegalArgumentException("Question not found");
        }
        return answerRepository.save(answer);
    }

    // Get answers by question ID
    public List<Answer> getAnswersByQuestionId(String questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    // Mark an answer as accepted
    public void markAsAccepted(String id) {
        Optional<Answer> optionalAnswer = answerRepository.findById(id);
        if (optionalAnswer.isEmpty()) {
            throw new IllegalArgumentException("Answer not found");
        }

        Answer answer = optionalAnswer.get();
        answer.setAccepted(true);
        answerRepository.save(answer);
    }

    // Upvote an answer
    public void upvoteAnswer(String id) {
        Optional<Answer> optionalAnswer = answerRepository.findById(id);
        if (optionalAnswer.isEmpty()) {
            throw new IllegalArgumentException("Answer not found");
        }

        Answer answer = optionalAnswer.get();
        answer.setUpvotes(answer.getUpvotes() + 1);
        answerRepository.save(answer);
    }

    // Delete an answer
    public void deleteAnswer(String id) {
        if (!answerRepository.existsById(id)) {
            throw new IllegalArgumentException("Answer not found");
        }
        answerRepository.deleteById(id);
    }
}
