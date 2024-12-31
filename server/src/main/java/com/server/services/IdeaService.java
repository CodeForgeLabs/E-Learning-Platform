package com.server.services;

import com.server.models.Idea;
import com.server.repositories.IdeaRepository;
import com.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IdeaService {

    @Autowired
    private IdeaRepository ideaRepository;

    @Autowired
    private VoteService voteService;

    @Autowired
    private TagService tagService;  // Inject TagService

    // Create a new Idea
    public Idea createIdea(Idea Idea) {
        // If the Idea contains tags, we will associate those tags with the Idea
        if (Idea.getTags() != null && !Idea.getTags().isEmpty()) {
            tagService.addTagsToIdea(Idea.getTags());  // Add tags to the Idea (no need to pass IdeaId here)
        }

        // Save the Idea after tag association
        return ideaRepository.save(Idea);
    }

    // Get all Ideas
    public List<Idea> getAllIdeas() {
        return ideaRepository.findByOrderByCreatedAtDesc();
    }

    // Get a Idea by ID
    public Optional<Idea> getIdeaById(String id) {
        return ideaRepository.findById(id);
    }

    // Update a Idea
    public Idea updateIdea(String id, Idea IdeaDetails) {
        Idea Idea = ideaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Idea not found"));

        Idea.setTitle(IdeaDetails.getTitle());
        Idea.setBody(IdeaDetails.getBody());
        Idea.setAuthor(IdeaDetails.getAuthor());

        // Update tags
        if (IdeaDetails.getTags() != null && !IdeaDetails.getTags().isEmpty()) {
            tagService.addTagsToIdea(IdeaDetails.getTags());
            Idea.setTags(IdeaDetails.getTags());
        }

        return ideaRepository.save(Idea);
    }

    // Delete a Idea by ID
    public void deleteIdea(String id) {
        ideaRepository.deleteById(id);
    }

    // Upvote or downvote a Idea using VoteService
    public String voteIdea(String userId, String IdeaId, boolean isUpvote) {
        return voteService.voteIdea(userId, IdeaId, isUpvote);
    }

    // Get all Ideas by a specific user
    public List<Idea> getIdeasByUserId(String userId) {
        return ideaRepository.findByAuthor_Id(userId);
    }

    // Find Ideas by title (case-insensitive)
    public List<Idea> getIdeasByTitle(String title) {
        return ideaRepository.findByTitleContainingIgnoreCase(title);
    }
    // Get all Idea by most upvote
    public List<Idea> getAllIdeasOrderedByVoteCount() {
        return ideaRepository.findByOrderByVoteCountDesc();
    }

    // Find Ideas by a specific tag (case-insensitive)
    public List<Idea> getIdeasByTag(String tagName) {
        return ideaRepository.findByTagsIgnoreCaseContaining(tagName);
    }
}
