package com.server.services;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
@Service
public class AuthService {


    public String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            System.out.println("Current authenticated user: " + username);
            return username;
        } else {
            String username = principal.toString();
            System.out.println("Current authenticated user: " + username);
            return username;
        }
    }
}