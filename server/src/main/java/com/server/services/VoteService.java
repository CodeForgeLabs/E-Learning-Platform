package com.server.services;

import com.server.models.Answer;
import com.server.models.Question;
import com.server.models.User;
import com.server.models.Vote;
import com.server.repositories.AnswerRepository;
import com.server.repositories.QuestionRepository;
import com.server.repositories.UserRepository;
import com.server.repositories.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private UserService userService;

    // Upvote or downvote a question
    public String voteQuestion(String userId, String questionId, boolean isUpvote) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        if (!optionalQuestion.isPresent()) {
            return "Question not found";
        }

        Question question = optionalQuestion.get();
        String questionAuthorId = question.getAuthor().getId();
        Optional<User> questionAuthorOpt = userService.findById(questionAuthorId);
        if (questionAuthorOpt.isEmpty()) {
            return "Question author not found";
        }

        User questionAuthor = questionAuthorOpt.get();

        List<Vote> existingVotes = voteRepository.findByQuestion_Id(questionId);
        for (Vote existingVote : existingVotes) {
            if (existingVote.getVoter().getId().equals(userId)) {
                if (existingVote.isUpvote() == isUpvote) {
                    return "You have already voted this way";
                } else {
                    existingVote.setUpvote(isUpvote);
                    existingVote.applyVote();
                    voteRepository.save(existingVote);

                    if (isUpvote) {
                        question.upvote();
                        questionAuthor.setReputation(questionAuthor.getReputation() + 1);
                    } else {
                        question.downvote();
                        questionAuthor.setReputation(questionAuthor.getReputation() - 1);
                    }
                    questionRepository.save(question);
                    userService.saveExistingUser(questionAuthor);

                    return "Vote updated successfully";
                }
            }
        }

        // If no previous vote found, create a new vote
        Vote vote = new Vote();
        vote.setVoter(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
        vote.setQuestion(question);
        vote.setUpvote(isUpvote);
        voteRepository.save(vote);

        // Update the vote count and reputation
        if (isUpvote) {
            question.upvote();
            questionAuthor.setReputation(questionAuthor.getReputation() + 1);
        } else {
            question.downvote();
            questionAuthor.setReputation(questionAuthor.getReputation() - 1);
        }
        questionRepository.save(question);
        userService.saveExistingUser(questionAuthor);

        return "Vote applied successfully";
    }

    // Upvote or downvote an answer
    public String voteAnswer(String userId, String answerId, boolean isUpvote) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        if (!optionalAnswer.isPresent()) {
            return "Answer not found";
        }

        Answer answer = optionalAnswer.get();
        String answerAuthorId = answer.getAuthor().getId();
        Optional<User> answerAuthorOpt = userService.findById(answerAuthorId);
        if (answerAuthorOpt.isEmpty()) {
            return "Answer author not found";
        }

        User answerAuthor = answerAuthorOpt.get();

        List<Vote> existingVotes = voteRepository.findByAnswer_Id(answerId);
        for (Vote existingVote : existingVotes) {
            if (existingVote.getVoter().getId().equals(userId)) {
                if (existingVote.isUpvote() == isUpvote) {
                    return "You have already voted this way";
                } else {
                    existingVote.setUpvote(isUpvote);
                    existingVote.applyVote();
                    voteRepository.save(existingVote);

                    if (isUpvote) {
                        answer.upvote();
                        answerAuthor.setReputation(answerAuthor.getReputation() + 1);
                    } else {
                        answer.downvote();
                        answerAuthor.setReputation(answerAuthor.getReputation() - 1);
                    }
                    answerRepository.save(answer);
                    userService.saveExistingUser(answerAuthor);

                    return "Vote updated successfully";
                }
            }
        }

        // If no previous vote found, create a new vote
        Vote vote = new Vote();
        vote.setVoter(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
        vote.setAnswer(answer);
        vote.setUpvote(isUpvote);
        voteRepository.save(vote);

        if (isUpvote) {
            answer.upvote();
            answerAuthor.setReputation(answerAuthor.getReputation() + 1);
        } else {
            answer.downvote();
            answerAuthor.setReputation(answerAuthor.getReputation() - 1);
        }
        answerRepository.save(answer);
        userService.saveExistingUser(answerAuthor);

        return "Vote applied successfully";
    }

    // Get all votes for a specific question
    public List<Vote> getVotesForQuestion(String questionId) {
        return voteRepository.findByQuestion_Id(questionId);
    }

    // Get all votes for a specific answer
    public List<Vote> getVotesForAnswer(String answerId) {
        return voteRepository.findByAnswer_Id(answerId);
    }

    // Get a user's vote on a specific question
    public Optional<Vote> getUserVoteOnQuestion(String userId, String questionId) {
        List<Vote> votes = voteRepository.findByQuestion_Id(questionId);
        return votes.stream().filter(vote -> vote.getVoter().getId().equals(userId)).findFirst();
    }

    // Get a user's vote on a specific answer
    public Optional<Vote> getUserVoteOnAnswer(String userId, String answerId) {
        List<Vote> votes = voteRepository.findByAnswer_Id(answerId);
        return votes.stream().filter(vote -> vote.getVoter().getId().equals(userId)).findFirst();
    }
}