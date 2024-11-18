package com.server.services;

import com.server.models.Question;
import com.server.models.Tag;
import com.server.repositories.QuestionRepository;
import com.server.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TagRepository tagRepository;

    // Create a new question and associate tags with it
    public Question createQuestion(Question question, List<String> tagNames) {
        // Save the question first
        Question savedQuestion = questionRepository.save(question);

        // Associate tags with the question
        for (String tagName : tagNames) {
            Optional<Tag> tagOpt = tagRepository.findByName(tagName);
            tagOpt.ifPresent(tag -> {
                tag.getQuestions().add(savedQuestion);
                tagRepository.save(tag); // Save updated tag with question
                savedQuestion.getTags().add(tag); // Add tag to question
            });
        }

        return savedQuestion;
    }

    // Find all questions associated with a specific tag
    public List<Question> findQuestionsByTag(String tagName) {
        return questionRepository.findByTags_Name(tagName);
    }

    // Additional service methods for querying, updating, etc.
}
