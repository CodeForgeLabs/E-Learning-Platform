package com.server.security;

import com.server.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("Inside JwtAuthFilter - doFilterInternal");
        String token = extractToken(request);
        System.out.println("Extracted Token: " + token);
        String requestURI = request.getRequestURI();



        if ("/auth/login".equals(requestURI) || "/auth/register".equals(requestURI) ){
            filterChain.doFilter(request, response);
            return;
        }


        if (token != null && jwtUtil.isTokenValid(token, extractUsername(token))) {
            Claims claims = jwtUtil.extractClaims(token);
            String username = claims.getSubject();
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(username, null, null)
            );
        } else {
            System.out.println("Token is null or invalid");
        }
        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("jwt_token");
        if (header != null  ) {;
            return header;
        }

        if (request.getCookies() != null){
            for (Cookie cookie:request.getCookies()){
                if ("JWT_TOKEN".equals(cookie.getName())){
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    private String extractUsername(String token) {
        return jwtUtil.extractUsername(token);
    }
}


