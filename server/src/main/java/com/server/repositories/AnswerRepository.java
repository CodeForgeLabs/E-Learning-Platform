package com.server.repositories;

import com.server.models.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends MongoRepository<Answer, String> {
    // Find answers by the associated question's ID
    List<Answer> findByQuestion_Id(String questionId); // Note the use of underscore in "question_Id"

    // Find answers by the author (user) ID
    List<Answer> findByAuthor_Id(String authorId); // Note the use of underscore in "author_Id"
}
