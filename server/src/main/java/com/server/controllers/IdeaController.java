package com.server.controllers;

import com.server.models.Idea;
import com.server.models.Idea;
import com.server.models.User;
import com.server.services.IdeaService;
import com.server.services.UserService;
import com.server.services.VoteService;
import com.server.services.AuthService;
import com.server.services.IdeaService;
import com.server.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/idea")
public class IdeaController {


    private final IdeaService ideaService;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final VoteService voteService;
    private final AuthService authService;

    @Autowired
    public IdeaController(IdeaService ideaService, UserService userService, JwtUtil jwtUtil, VoteService voteService, AuthService authService) {
        this.ideaService = ideaService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.voteService = voteService;
        this.authService = authService;
    }

    // Create a new Idea
    @PostMapping
    public ResponseEntity<Idea> createIdeaWithAuthUser(@RequestBody Idea Idea, HttpServletRequest request) {
        String username = authService.getCurrentUsername();
        Optional<User> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        //Increment reputation based on custom value (in this case 5)
        User currentUser = user.get();
        currentUser.setReputation(currentUser.getReputation() + 15);
        userService.saveExistingUser(currentUser);

        Idea.setAuthor(user.get());
        return ResponseEntity.status(HttpStatus.CREATED).body(ideaService.createIdea(Idea));
    }

    // Get all Ideas
    @GetMapping
    public ResponseEntity<List<Idea>> getAllIdeas() {
        return ResponseEntity.ok(ideaService.getAllIdeas());
    }

    //Get all Idea ordered by Upvotes
    @GetMapping("/most-upvotes")
    public ResponseEntity<List<Idea>> getAllIdeaOrderedbyVoteCount(){
        return ResponseEntity.ok(ideaService.getAllIdeasOrderedByVoteCount());
    }

    // Get a specific Idea by ID
    @GetMapping("/{id}")
    public ResponseEntity<Idea> getIdeaById(@PathVariable String id) {
        return ideaService.getIdeaById(id)
                .map(Idea -> ResponseEntity.ok(Idea))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    // Update a Idea
    @PutMapping("/{id}")
    public ResponseEntity<Idea> updateIdea(@PathVariable String id, @RequestBody Idea IdeaDetails) {
        try {
            return ResponseEntity.ok(ideaService.updateIdea(id, IdeaDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a Idea
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIdea(@PathVariable String id) {
        ideaService.deleteIdea(id);
        return ResponseEntity.noContent().build();
    }

    // Upvote or downvote a Idea
    @PostMapping("/{IdeaId}/vote")
    public ResponseEntity<String> voteIdea(@PathVariable String IdeaId, @RequestParam boolean isUpvote) {
        String username = authService.getCurrentUsername();
        Optional<User> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }




        return ResponseEntity.ok(voteService.voteIdea(user.get().getId(), IdeaId, isUpvote));
    }

    // Get all Ideas by a specific user
    @GetMapping("/user/current-auth-user")
    public ResponseEntity<List<Idea>> getIdeasByUserId() {
        String username = authService.getCurrentUsername();
        Optional<User> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(ideaService.getIdeasByUserId(user.get().getId()));
    }

    // Find Ideas by title (case-insensitive)
    @GetMapping("/title/{title}")
    public ResponseEntity<List<Idea>> getIdeasByTitle(@PathVariable String title) {
        return ResponseEntity.ok(ideaService.getIdeasByTitle(title));
    }

    // Find Ideas by a specific tag
    @GetMapping("/tag/{tagName}")
    public ResponseEntity<List<Idea>> getIdeasByTag(@PathVariable String tagName) {
        return ResponseEntity.ok(ideaService.getIdeasByTag(tagName));
    }
}
