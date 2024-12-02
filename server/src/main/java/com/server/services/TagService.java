package com.server.services;

import com.server.models.Tag;
import com.server.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    // Find a tag by its name
    public Tag getTagByName(String name) {
        return tagRepository.findByName(name);
    }

    // Get all tags with a popularity count greater than a specified value
    public List<Tag> getTagsByPopularity(int popularityCount) {
        return tagRepository.findByPopularityCountGreaterThan(popularityCount);
    }

    // Add tags to the question
    public void addTagsToQuestion(List<String> tagNames) {
        for (String tagName : tagNames) {
            // Find existing tag or create a new one
            Tag tag = tagRepository.findByName(tagName);
            if (tag == null) {
                tag = new Tag();
                tag.setName(tagName);
                tag.setPopularityCount(0); // Initialize popularity count
                tagRepository.save(tag); // Save the new tag
            }

            // Increment popularity count and save the tag
            tag.setPopularityCount(tag.getPopularityCount() + 1);
            tagRepository.save(tag);
        }
    }
}
