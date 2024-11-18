package com.server.services;

import com.server.models.Tag;
import com.server.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    // Create a new tag
    public Tag createTag(Tag tag) {
        return tagRepository.save(tag);
    }

    // Find a tag by its name
    public Optional<Tag> findByName(String name) {
        return tagRepository.findByName(name);
    }

    // Additional service methods for tag management
}
