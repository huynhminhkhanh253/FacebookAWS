package com.example.facebookapi.Repository;

import java.util.ArrayList;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.example.facebookapi.Entity.Status;

@Repository
public interface StatusRepository extends CassandraRepository<Status, UUID>{
    Status save(Status status);
    ArrayList<Status> findAll(); 
}
