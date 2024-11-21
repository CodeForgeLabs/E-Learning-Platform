package com.server.services;
import java.util.stream.Collectors;
import java.util.Optional;
import com.server.models.Question;
import com.server.models.Tag;
import com.server.repositories.QuestionRepository;
import com.server.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TagRepository tagRepository;

    // Add a new question with optional tags
    public Question createQuestion(Question question) {
        List<Tag> tags = question.getTags();

        if (tags != null && !tags.isEmpty()) {
            for (Tag tag : tags) {
                // Check if the tag already exists
                Tag existingTag = tagRepository.findByName(tag.getName());
                if (existingTag == null) {
                    tagRepository.save(tag); // Save new tag if it doesn't exist
                } else {
                    tag = existingTag; // Use existing tag
                }
            }
        }

        // Associate tags with the question
        question.setTags(tags);

        return questionRepository.save(question); // Save the question with its tags
    }

    // Find questions by tag ID
    public List<Question> getQuestionsByTagId(String tagId) {
        return questionRepository.findByTags_Id(tagId);
    }

    // Find questions by tag name
    public List<Question> getQuestionsByTagName(String tagName) {
        return questionRepository.findByTags_Name(tagName);
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

    // Find valid questions from the list of provided questions (based on question references)
    public List<Question> findValidQuestions(List<Question> questions) {
        List<String> questionIds = questions.stream()
                .map(Question::getId)  // Get the IDs from the question objects
                .collect(Collectors.toList());

        // Retrieve all questions with these IDs from the database
        return questionRepository.findAllById(questionIds);
    }
}
