package com.example.facebookapi.Repository;

import java.util.ArrayList;
import java.util.UUID;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;

import com.example.facebookapi.Entity.Comment;

public interface CommentRepository extends CassandraRepository<Comment, UUID> {
    Comment save(Comment comment);

    @AllowFiltering
    ArrayList<Comment> findAllBypostID(UUID postID);
}
