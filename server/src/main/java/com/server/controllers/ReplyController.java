package com.server.controllers;

import com.server.models.Reply;
import com.server.models.User;
import com.server.services.VoteService;

import java.util.Optional;
import java.util.List;
import com.server.services.AuthService;
import com.server.services.UserService;
import com.server.services.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/replies")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @Autowired
    private VoteService voteService;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    // Get all replies for a specific idea
    @GetMapping("/idea/{ideaId}")
    public ResponseEntity<List<Reply>> getRepliesByIdeaId(@PathVariable String ideaId) {
        return ResponseEntity.ok(replyService.getRepliesByIdea(ideaId));
    }

    // // Get all replies for a specific idea ordered by creation date
    // @GetMapping("/idea/{ideaId}/recent")
    // public ResponseEntity<List<Reply>> getRepliesByIdeaIdOrderedByCreatedAtDesc(@PathVariable String ideaId) {
    //     return ResponseEntity.ok(replyService.getRepliesByIdeaIdOrderedByCreatedAtDesc(ideaId));
    // }

    // Get all replies by a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reply>> getRepliesByUserId(@PathVariable String userId) {
        String username = authService.getCurrentUsername();
        Optional<User> user = userService.findByUsername(username);
        if(user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(replyService.getRepliesByUserId(user.get().getId()));
    }

    // Get a specific reply by ID
    @GetMapping("/{id}")
    public ResponseEntity<Reply> getReplyById(@PathVariable String id) {
        return replyService.getReplyById(id)
                .map(reply -> ResponseEntity.ok(reply))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create a new reply
    @PostMapping
    public ResponseEntity<Reply> createReply(@RequestBody Reply reply) {
        String username = authService.getCurrentUsername();
        Optional<User> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User currentUser = user.get();
        currentUser.setReputation(currentUser.getReputation() + 5);
        userService.saveExistingUser(currentUser);

        reply.setAuthor(user.get());
        return ResponseEntity.status(HttpStatus.CREATED).body(replyService.createReply(reply));
    }

    // Update an existing reply
    @PutMapping("/{id}")
    public ResponseEntity<Reply> updateReply(@PathVariable String id, @RequestBody String newBody) {
        try {
            return ResponseEntity.ok(replyService.updateReply(id, newBody));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Upvote or downvote a question
    @PostMapping("/{replyId}/vote")
    public ResponseEntity<String> voteIdea(@PathVariable String replyId, @RequestParam boolean isUpvote) {
        String username = authService.getCurrentUsername();
        Optional<User> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(voteService.voteReply(user.get().getId(), replyId, isUpvote));
    }

    // Delete a reply by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReply(@PathVariable String id) {
        replyService.deleteReply(id);
        return ResponseEntity.noContent().build();
    }
}
