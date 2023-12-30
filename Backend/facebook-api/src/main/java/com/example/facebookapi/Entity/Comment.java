package com.example.facebookapi.Entity;

import java.sql.Timestamp;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("comment")
public class Comment {
    
    @PrimaryKey
    private UUID commentID;

    private String userID;
    private UUID postID;

    private String comment;
    private Timestamp timestamp;

    public Comment(){
        super();
    }

    public Comment(UUID commentID, String userID, UUID postID, String comment, Timestamp timestamp) {
        super();
        this.commentID = commentID;
        this.userID = userID;
        this.postID = postID;
        this.comment = comment;
        this.timestamp = timestamp;
    }

    public UUID getCommentID() {
        return commentID;
    }

    public void setCommentID(UUID commentID) {
        this.commentID = commentID;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public UUID getPostID() {
        return postID;
    }

    public void setPostID(UUID postID) {
        this.postID = postID;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    

    

}
