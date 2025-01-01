package com.server.controllers;

import com.server.models.Question;
import com.server.models.User;
import com.server.services.QuestionService;
import com.server.services.UserService;
import com.server.services.VoteService;
import com.server.services.AuthService;
import com.server.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {


    private final QuestionService questionService;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final VoteService voteService;
    private final AuthService authService;

    @Autowired
    public QuestionController(QuestionService questionService, UserService userService, JwtUtil jwtUtil, VoteService voteService, AuthService authService) {
        this.questionService = questionService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.voteService = voteService;
        this.authService = authService;
    }

    // Create a new question
    @PostMapping
    public ResponseEntity<Question> createQuestionWithAuthUser(@RequestBody Question question, HttpServletRequest request) {
        String username = authService.getCurrentUsername();
        Optional<User> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }


        //Increment reputation based on custom value (in this case 5)
        User currentUser = user.get();
        currentUser.setReputation(currentUser.getReputation() + 15);
        currentUser.setQuestions_asked(currentUser.getQuestions_asked() + 1);
        userService.saveExistingUser(currentUser);

        question.setAuthor(user.get());
        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.createQuestion(question));
    }

    // Get all questions
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    //Get all question ordered by Upvotes
    @GetMapping("/most-upvotes")
    public ResponseEntity<List<Question>> getAllQuestionOrderedbyVoteCount(){
        return ResponseEntity.ok(questionService.getAllQuestionsOrderedByVoteCount());
    }

    // Get a specific question by ID
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable String id) {
        return questionService.getQuestionById(id)
                .map(question -> ResponseEntity.ok(question))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    // Update a question
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable String id, @RequestBody Question questionDetails) {
        try {
            return ResponseEntity.ok(questionService.updateQuestion(id, questionDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a question
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable String id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    // Upvote or downvote a question
    @PostMapping("/{questionId}/vote")
    public ResponseEntity<String> voteQuestion(@PathVariable String questionId, @RequestParam boolean isUpvote) {
        String username = authService.getCurrentUsername();
        Optional<User> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }




        return ResponseEntity.ok(voteService.voteQuestion(user.get().getId(), questionId, isUpvote));
    }

    // Get all questions by a specific user
    @GetMapping("/user/current-auth-user")
    public ResponseEntity<List<Question>> getQuestionsByUserId() {
        String username = authService.getCurrentUsername();
        Optional<User> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(questionService.getQuestionsByUserId(user.get().getId()));
    }

    // Find questions by title (case-insensitive)
    @GetMapping("/title/{title}")
    public ResponseEntity<List<Question>> getQuestionsByTitle(@PathVariable String title) {
        return ResponseEntity.ok(questionService.getQuestionsByTitle(title));
    }

    // Find questions by a specific tag
    @GetMapping("/tag/{tagName}")
    public ResponseEntity<List<Question>> getQuestionsByTag(@PathVariable String tagName) {
        return ResponseEntity.ok(questionService.getQuestionsByTag(tagName));
    }
}
