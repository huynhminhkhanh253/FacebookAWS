package com.example.facebookapi.Service;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.facebookapi.Entity.Comment;
import com.example.facebookapi.Repository.CommentRepository;

@Service
public class CommentService {
    
    @Autowired
    CommentRepository commentRepository;
    

    public Comment saveComment(Comment comment){
        Date date = new Date();
		long time = date.getTime();
		Timestamp dateTime = new Timestamp(time);
        comment.setCommentID(UUID.randomUUID());
        comment.setTimestamp(dateTime);

        return commentRepository.save(comment);
    }
    public ArrayList<Comment> getAllComments(UUID postID){
        return commentRepository.findAllBypostID(postID);
    }
}