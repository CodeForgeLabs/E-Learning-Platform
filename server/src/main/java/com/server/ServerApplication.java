package com.server;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ServerApplication {

	public static void main(String[] args) {
		// Load environment variables from .env file
		Dotenv dotenv = Dotenv.load();

		// Set system properties for Spring to use
		System.setProperty("MONGO_DATABASE", dotenv.get("MONGO_DATABASE"));
		System.setProperty("MONGO_USER", dotenv.get("MONGO_USER"));
		System.setProperty("MONGO_PASSWORD", dotenv.get("MONGO_PASSWORD"));
		System.setProperty("MONGO_CLUSTER", dotenv.get("MONGO_CLUSTER"));

		SpringApplication.run(ServerApplication.class, args);
	}

	@GetMapping
	public String check(){
		return "Checking in";
	}
}
