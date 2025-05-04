package com.example.security;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.model.User;
import com.example.service.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtUtil jwtService;
  private final CustomUserDetailsService customUserDetailsService;

  public JwtAuthFilter(JwtUtil jwtService, CustomUserDetailsService customUserDetailsService) {
    this.jwtService = jwtService;
    this.customUserDetailsService = customUserDetailsService;
  }

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {

    if (request.getServletPath().startsWith("/api/auth")) {
      filterChain.doFilter(request, response);
      return;
    }
    System.out.println("------------jwt filter called-----------");

    final String authHeader = request.getHeader("Authorization");
    final String jwt;
    final String email;

    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      jwt = authHeader.substring(7);
      email = jwtService.extractEmail(jwt);

      if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        try {
          User user = this.customUserDetailsService.loadUserByEmail(email);
          if (jwtService.isTokenValid(jwt, user)) {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                null,
                user.getAuthorities());
            authToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
          }
        } catch (Exception ex) {
          System.out.println(ex.getMessage());
          return;
        }
      }
      filterChain.doFilter(request, response);
    }
    return;

  }
}
