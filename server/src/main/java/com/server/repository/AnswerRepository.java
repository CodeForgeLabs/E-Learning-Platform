package com.server.repositories;

import com.server.models.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AnswerRepository extends MongoRepository<Answer, String> {

    List<Answer> findByQuestionId(String questionId);  // Find answers by question ID
}
