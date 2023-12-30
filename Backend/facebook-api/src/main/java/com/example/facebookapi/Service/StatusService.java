package com.example.facebookapi.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.facebookapi.Entity.Post;
import com.example.facebookapi.Entity.Status;
import com.example.facebookapi.Repository.StatusRepository;

@Service
public class StatusService {
    
    @Autowired
    StatusRepository statusRepository;

    public Status saveStatus(Status status){
        Date date = new Date();
		long time = date.getTime();
		Timestamp dateTime = new Timestamp(time);
        
        status.setStatusID(UUID.randomUUID());
        status.setUploadTime(dateTime);
		return statusRepository.save(status);
    }
    public ArrayList<Status> getAllStatus(){
        return statusRepository.findAll();
    }
}
