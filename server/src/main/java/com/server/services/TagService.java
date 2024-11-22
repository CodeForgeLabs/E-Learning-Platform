package com.server.services;

import com.server.models.Tag;
import com.server.models.Question;
import com.server.repositories.TagRepository;
import com.server.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private QuestionRepository questionRepository;

    // Add an existing tag to an existing question based on questionId
    public Tag addTagToQuestion(String questionId, Tag tag) {
        // First, check if the tag exists in the repository, else save the new tag
        Tag existingTag = tagRepository.findByName(tag.getName());
        if (existingTag == null) {
            existingTag = tagRepository.save(tag);  // If the tag does not exist, save it
        }

        // Find the question by its ID
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isPresent()) {
            Question question = questionOptional.get();

            // Check if the tag is already associated with the question to avoid duplicates
            if (!question.getTags().contains(existingTag)) {
                question.getTags().add(existingTag);  // Add the tag to the question
                questionRepository.save(question);  // Save the updated question
            }

            return existingTag;
        } else {
            throw new IllegalArgumentException("Question not found with ID: " + questionId);
        }
    }

    // Find a tag by its name
    public Tag findTagByName(String name) {
        return tagRepository.findByName(name);
    }

    // Find questions by tag name
    public List<Question> findQuestionsByTagName(String tagName) {
        Tag tag = tagRepository.findByName(tagName);
        if (tag == null) {
            throw new IllegalArgumentException("Tag not found");
        }
        return questionRepository.findByTags_Id(tag.getId());
    }
}
