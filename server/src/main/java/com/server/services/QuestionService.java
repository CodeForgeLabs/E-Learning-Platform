package com.server.services;

import com.server.models.Question;
import com.server.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    // Create a new question
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    // Get all questions
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // Get a question by ID
    public Optional<Question> getQuestionById(String id) {
        return questionRepository.findById(id);
    }

    // Delete a question by ID
    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }

    // Update a question
    public Question updateQuestion(String id, Question questionDetails) {
        Question question = questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
        question.setTitle(questionDetails.getTitle());
        question.setBody(questionDetails.getBody());
        question.setAuthor(questionDetails.getAuthor());
        return questionRepository.save(question);
    }

    // Get all questions by a specific user
    public List<Question> getQuestionsByUserId(String userId) {
        return questionRepository.findByAuthor_Id(userId);
    }

    // Find questions by title (case-insensitive)
    public List<Question> getQuestionsByTitle(String title) {
        return questionRepository.findByTitleContainingIgnoreCase(title);
    }


}
