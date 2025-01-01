package com.server.repositories;

import com.server.models.Reply;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface ReplyRepository extends MongoRepository<Reply, String> {
    
    List<Reply> findByIdea_Id(String ideaId);

    List<Reply> findByAuthor_Id(String userID);

//    List<Reply> findByIdea_IdOrderedByCreatedAtDesc(String ideaId);
    
}
