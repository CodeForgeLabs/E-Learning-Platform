package com.server.services;

import com.server.models.Question;
import com.server.repositories.QuestionRepository;
import com.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private VoteService voteService;

    @Autowired
    private TagService tagService;  // Inject TagService

    // Create a new question
    public Question createQuestion(Question question) {
        // If the question contains tags, we will associate those tags with the question
        if (question.getTags() != null && !question.getTags().isEmpty()) {
            tagService.addTagsToQuestion(question.getTags());  // Add tags to the question (no need to pass questionId here)
        }

        // Save the question after tag association
        return questionRepository.save(question);
    }

    // Get all questions
    public List<Question> getAllQuestions() {
        return questionRepository.findByOrderByCreatedAtDesc();
    }

    // Get a question by ID
    public Optional<Question> getQuestionById(String id) {
        return questionRepository.findById(id);
    }

    // Update a question
    public Question updateQuestion(String id, Question questionDetails) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        question.setTitle(questionDetails.getTitle());
        question.setBody(questionDetails.getBody());
        question.setAuthor(questionDetails.getAuthor());

        return questionRepository.save(question);
    }

    // Delete a question by ID
    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }

    // Upvote or downvote a question using VoteService
    public String voteQuestion(String userId, String questionId, boolean isUpvote) {
        return voteService.voteQuestion(userId, questionId, isUpvote);
    }

    // Get all questions by a specific user
    public List<Question> getQuestionsByUserId(String userId) {
        return questionRepository.findByAuthor_Id(userId);
    }

    // Find questions by title (case-insensitive)
    public List<Question> getQuestionsByTitle(String title) {
        return questionRepository.findByTitleContainingIgnoreCase(title);
    }

    // Find questions by a specific tag
    public List<Question> getQuestionsByTag(String tagName) {
        return questionRepository.findByTagsContaining(tagName);
    }
}
