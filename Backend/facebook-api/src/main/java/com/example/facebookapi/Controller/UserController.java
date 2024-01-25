package com.example.facebookapi.Controller;

import java.util.ArrayList;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.facebookapi.Entity.User;
import com.example.facebookapi.Service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/userService")
public class UserController {
    
    @Autowired
    UserService userService;

    @PostMapping("/save")
    public User saveUserMetaData(@RequestBody User user){
        return userService.submitMetaDataOfUser(user);
    }
    @GetMapping("/getAllUsers")
    public ArrayList<User> getAllUserDetails(){
        ArrayList<User> result = userService.retrieveAllUserDetails();
        return result;
    }
    @GetMapping("/getUserDetails/{userID}")
    public User getUserDetails(@PathVariable("userID") String userID){
        return userService.getUserData(userID);
    }
    @DeleteMapping("/delete/{userID}")
    public ArrayList<User> deleteUser(@PathVariable("userID") String userID){
        ArrayList<User> result = userService.deleteUserdata(userID);
        return result;
    }
}                            
