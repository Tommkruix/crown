package org.crown.repository;

import org.crown.domain.DocumentUpload;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
    * Spring Data MongoDB repository for the DocumentUpload entity.
    */

@Repository
public interface DocumentUploadRepository extends MongoRepository<DocumentUpload, String> {
}
