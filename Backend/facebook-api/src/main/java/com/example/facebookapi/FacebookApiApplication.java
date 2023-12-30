package com.example.facebookapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class FacebookApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FacebookApiApplication.class, args);
	}

}
