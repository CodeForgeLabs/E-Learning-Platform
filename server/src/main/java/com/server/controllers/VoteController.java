package com.server.controllers;

import com.server.models.Vote;
import com.server.services.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/votes")
public class VoteController {

    @Autowired
    private VoteService voteService;

    // Upvote or downvote a question or answer (both can use the same endpoint)
    @PostMapping("/{type}/{id}")
    public ResponseEntity<String> vote(@RequestParam String userId, @PathVariable String type, @PathVariable String id, @RequestParam boolean isUpvote) {
        String response;
        if ("question".equalsIgnoreCase(type)) {
            response = voteService.voteQuestion(userId, id, isUpvote);
        } else if ("answer".equalsIgnoreCase(type)) {
            response = voteService.voteAnswer(userId, id, isUpvote);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid type: Use 'question' or 'answer'");
        }
        return ResponseEntity.ok(response);
    }

    // Get votes for a question or answer (both can use the same endpoint)
    @GetMapping("/{type}/{id}")
    public ResponseEntity<List<Vote>> getVotes(@PathVariable String type, @PathVariable String id) {
        List<Vote> votes;
        if ("question".equalsIgnoreCase(type)) {
            votes = voteService.getVotesForQuestion(id);
        } else if ("answer".equalsIgnoreCase(type)) {
            votes = voteService.getVotesForAnswer(id);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(votes);
    }

    // Get a user's vote on a specific question or answer (both can use the same endpoint)
    @GetMapping("/user/{userId}/{type}/{id}")
    public ResponseEntity<Vote> getUserVote(@PathVariable String userId, @PathVariable String type, @PathVariable String id) {
        Optional<Vote> vote;
        if ("question".equalsIgnoreCase(type)) {
            vote = voteService.getUserVoteOnQuestion(userId, id);
        } else if ("answer".equalsIgnoreCase(type)) {
            vote = voteService.getUserVoteOnAnswer(userId, id);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return vote.map(v -> ResponseEntity.ok(v)).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
